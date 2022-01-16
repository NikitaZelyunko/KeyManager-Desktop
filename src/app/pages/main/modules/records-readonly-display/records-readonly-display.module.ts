import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadonlyRecordsListComponent } from './components/readonly-records-list/readonly-records-list.component';
import { RecordsModule } from '../records/records.module';

@NgModule({
  declarations: [ReadonlyRecordsListComponent],
  imports: [CommonModule, RecordsModule],
  exports: [ReadonlyRecordsListComponent],
})
export class RecordsReadonlyDisplayModule {}
