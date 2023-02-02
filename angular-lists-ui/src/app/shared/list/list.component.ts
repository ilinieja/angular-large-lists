import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs';

import { ResourceModel } from '../api/resource.model';
import { ResourceService } from '../api/resource.service';

/**
 * Gets, and renders list of items using child template for each element.
 * Updates items on search query change.
 * 
 * Uses virtual scroll to improve performance with large lists.
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T extends ResourceModel<T>> {
  @Input() name?: string;

  /** List item height, needed for virtual scroll calculations. */
  @Input() itemHeightPx = 56;

  /** Delay between search input change and new list request. */
  @Input() searchChangeDelayMs = 400;

  /**
   * Control receiving selected items changes.
   * Propagated to mat-selection-list.
   *
   * Quick option to keep component simple.
   * Should be replaced with ControlValueAccessor
   * if selection logic grows.
   */
  @Input() control = new FormControl([]);

  @ContentChild(TemplateRef) templateRef: TemplateRef<any> | null = null;

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

  constructor(private readonly resourceService: ResourceService<T>) {}
}
