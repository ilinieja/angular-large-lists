import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, ReplaySubject, takeUntil } from 'rxjs';
import { ResourceModel } from '../api/resource.model';

const SEARCH_CHANGE_DELAY_MS = 200;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T extends ResourceModel<T>> implements OnInit {
  @Input() name?: string;

  @Input() data: T[] | null = null;

  @Input() loading: boolean | null = true;

  @Output() searchChange = new EventEmitter<string>();

  @ContentChild(TemplateRef) templateRef: TemplateRef<any> | null = null;

  searchControl = new FormControl('');

  private readonly destroy = new ReplaySubject<void>(1);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(SEARCH_CHANGE_DELAY_MS), takeUntil(this.destroy))
      .subscribe((value) => {
        this.searchChange.emit(value ?? '');
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
