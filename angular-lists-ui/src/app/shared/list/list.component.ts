import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatListOption } from '@angular/material/list';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ResourceModel } from '../api/resource.model';
import { ResourceService } from '../api/resource.service';

/**
 * Gets, and renders list of items using child template for each element.
 * Updates items on search query change.
 *
 *
 * Uses virtual scroll to improve performance with large lists.
 * But there's some tricks needed to integrate virtual scroll
 * with selection list:
 *
 * By default selection list removes items from selection
 * if their element is removed from the view.
 * And virtual scroll removes elements that are out of view.
 *
 * We need to watch scroll and reapply selection for freshly
 * rendered items.
 *
 * @see: https://github.com/angular/components/issues/10122
 */
@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListComponent,
      multi: true,
    },
  ],
})
export class ListComponent<T extends ResourceModel<T>>
  implements AfterViewInit, ControlValueAccessor
{
  @Input() name?: string;

  /** List item height, needed for virtual scroll calculations. */
  @Input() itemHeightPx = 56;

  /** Delay between search input change and new list request. */
  @Input() searchChangeDelayMs = 400;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any> | null = null;

  @ViewChildren(MatListOption)
  matOptions?: QueryList<MatListOption>;

  @ViewChild('virtualScrollViewport')
  virtualScrollViewport?: CdkVirtualScrollViewport;

  private selection: T[] = [];

  searchControl = new FormControl('');

  readonly items = merge(
    // First request all items once.
    this.resourceService.get().pipe(take(1)),
    // Then request on query change.
    this.searchControl.valueChanges.pipe(
      debounceTime(this.searchChangeDelayMs),
      map((query) => query ?? ''),
      switchMap((query) => this.resourceService.get({ query }))
    )
  ).pipe(shareReplay(1));

  readonly loading = merge(
    this.items.pipe(map((countries) => !countries)),
    this.searchControl.valueChanges.pipe(map(() => true))
  ).pipe(startWith(true));

  constructor(
    private readonly resourceService: ResourceService<T>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly scrollDispatcher: ScrollDispatcher
  ) {}

  ngAfterViewInit(): void {
    /** Watch scroll and sync selection with rendered items. */
    this.scrollDispatcher
      .scrolled()
      .pipe(
        untilDestroyed(this),
        filter((scrollable) => this.virtualScrollViewport === scrollable),
        // Debounce needs to be short enough to see checks
        // even when scrolling fast.
        debounceTime(20)
      )
      .subscribe(() => {
        this.syncSelectionWithView();
      });
  }

  /**
   * Synchronizes selection and checked/unchecked states
   * of rendered options.
   */
  private syncSelectionWithView(): void {
    let needUpdate = false;

    this.matOptions?.forEach((option) => {
      const selected = this.selection.some((selectionItem) =>
        selectionItem.equals(option.value)
      );

      if (selected !== option.selected) {
        option.selected = selected;
        needUpdate = true;
      }
    });

    if (needUpdate) {
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Adds or removes item from selection and propagates the change up.
   */
  onItemSelectedChange(selected: boolean, item: T) {
    const itemIndex = this.selection.findIndex((selectionItem) =>
      selectionItem.equals(item)
    );
    const itemInSelection = itemIndex > -1;

    /**
     * If item state matches selection -
     * change is caused by state sync after rerender,
     * ignore it.
     */
    if (selected === itemInSelection) {
      return;
    }

    if (selected && !itemInSelection) {
      this.selection.push(item);
    } else if (!selected && itemInSelection) {
      this.selection.splice(itemIndex, 1);
    }

    this.onChange(this.selection);
  }

  /** ControlValueAccessor implementation. */
  set value(val: T[]) {
    this.selection = val;
    this.onChange(val);
    this.onTouch(val);
    this.syncSelectionWithView();
  }
  writeValue(value: T[]) {
    this.value = value;
  }

  onChange: Function = () => {};
  onTouch: Function = () => {};
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }
}
