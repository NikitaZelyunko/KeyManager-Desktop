import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDisplayComponent } from './components/record-display/record-display.component';
import { RecordsFilterComponent } from './components/records-filter/records-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordsFilterPipe } from './pipes/records-filter.pipe';
import { RecordItemComponent } from './components/record-item/record-item.component';
import { RecordCreateFormComponent } from './components/record-create-form/record-create-form.component';

@NgModule({
  declarations: [
    RecordDisplayComponent,
    RecordsFilterComponent,
    RecordItemComponent,
    RecordCreateFormComponent,
    RecordsFilterPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    RecordDisplayComponent,
    RecordsFilterComponent,
    RecordsFilterPipe,
    RecordItemComponent,
    RecordCreateFormComponent,
  ],
})
export class RecordsModule {}
