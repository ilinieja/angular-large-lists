import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
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
import { MatListOption } from '@angular/material/list';

import { ResourceModel } from '../resource/resource.model';
import { ResourceService } from '../resource/resource.service';

/**
 * Gets items and passes it to selection list.
 * Updates items on search query change.
 *
 * Injects the closest resource service provided above.
 */
@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent<T extends ResourceModel<T>> {
  @Input() name?: string;

  /** List item height, needed for virtual scroll calculations. */
  @Input() itemHeightPx = 56;

  /** Delay between search input change and new list request. */
  @Input() searchChangeDelayMs = 400;

  /** Template to render for every item. */
  @Input() listItemTemplate: TemplateRef<unknown> | null = null;

  /** Control for list selection. */
  @Input() listControl: FormControl<T[] | null> = new FormControl<T[]>([]);

  @ViewChildren(MatListOption)
  matOptions?: QueryList<MatListOption>;

  @ViewChild('virtualScrollViewport')
  virtualScrollViewport?: CdkVirtualScrollViewport;

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
