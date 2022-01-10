import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDisplayComponent } from './components/record-display/record-display.component';
import { RecordsFilterComponent } from './components/records-filter/records-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordsFilterPipe } from './pipes/records-filter.pipe';

@NgModule({
  declarations: [RecordDisplayComponent, RecordsFilterComponent, RecordsFilterPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RecordDisplayComponent, RecordsFilterComponent, RecordsFilterPipe],
})
export class RecordsModule {}
