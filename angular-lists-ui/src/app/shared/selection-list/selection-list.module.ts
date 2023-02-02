import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { SelectionListComponent } from './selection-list.component';

@NgModule({
  declarations: [SelectionListComponent],
  imports: [CommonModule, FormsModule, MatListModule, ScrollingModule],
  exports: [SelectionListComponent],
})
export class SelectionListModule {}
