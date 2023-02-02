import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ListComponent } from './list.component';

export const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatListModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  ScrollingModule,
];
@NgModule({
  declarations: [ListComponent],
  imports,
  exports: [ListComponent],
})
export class ListModule {}
