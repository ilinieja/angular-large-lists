import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { debounceTime, filter, merge, EMPTY, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatListOption } from '@angular/material/list';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Comparable } from '../interfaces/comparable.interface';

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
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectionListComponent,
      multi: true,
    },
  ],
})
export class SelectionListComponent<T extends Comparable<T>>
  implements AfterViewInit, ControlValueAccessor
{
  /** List item height, needed for virtual scroll calculations. */
  @Input() itemHeightPx = 56;

  @Input() items: T[] | null = [];

  /** Template to render for every item. */
  @Input() itemTemplate: TemplateRef<any> | null = null;

  @ViewChildren(MatListOption)
  private matOptions?: QueryList<MatListOption>;

  @ViewChild('virtualScrollViewport')
  private virtualScrollViewport?: CdkVirtualScrollViewport;

  @ViewChild(CdkVirtualForOf)
  private virtualForOf?: CdkVirtualForOf<T[]>;

  private selection: T[] = [];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly scrollDispatcher: ScrollDispatcher
  ) {}

  ngAfterViewInit(): void {
    /**
     * Watch virtual scroll rerenders and sync selection with rendered items.
     *
     * View change emits on all rerenders except scrollbar scroll,
     * merging it with scroll dispatcher to catch these cases.
     */
    const syncTriggers = [
      this.virtualForOf?.viewChange,
      this.scrollDispatcher
        .scrolled()
        .pipe(
          filter((scrollable) => this.virtualScrollViewport === scrollable)
        ),
    ].filter(Boolean) as Observable<unknown>[];

    merge(...syncTriggers)
      .pipe(
        untilDestroyed(this),
        // Debounce needs to be short enough to see checks
        // even when scrolling fast.
        debounceTime(10)
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
