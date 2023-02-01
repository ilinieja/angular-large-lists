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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T extends ResourceModel<T>> {
  @Input() name?: string;

  @Input() searchChangeDelay = 400;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any> | null = null;

  searchControl = new FormControl('');

  readonly items = merge(
    // First request all items once.
    this.resourceService.get().pipe(take(1)),
    // Then request on query change.
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
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
