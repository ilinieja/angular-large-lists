import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ResourceListComponent } from './resource-list.component';
import { SelectionListModule } from '../selection-list/selection-list.module';

export const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatListModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  ScrollingModule,
  SelectionListModule,
];
@NgModule({
  declarations: [ResourceListComponent],
  imports,
  exports: [ResourceListComponent],
})
export class ListModule {}
