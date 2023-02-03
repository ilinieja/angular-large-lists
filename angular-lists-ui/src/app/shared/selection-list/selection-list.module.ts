import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { SelectionListComponent } from './selection-list.component';

export const imports = [
  CommonModule,
  FormsModule,
  MatListModule,
  ScrollingModule,
];
@NgModule({
  declarations: [SelectionListComponent],
  imports,
  exports: [SelectionListComponent],
})
export class SelectionListModule {}
