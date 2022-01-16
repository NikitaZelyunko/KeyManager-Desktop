import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line max-len
import { EditableRecordsListComponent } from './components/editable-records-list/editable-records-list.component';
import { RecordsModule } from '../records/records.module';

@NgModule({
  declarations: [EditableRecordsListComponent],
  imports: [CommonModule, RecordsModule],
  exports: [EditableRecordsListComponent],
})
export class RecordsEditableDisplayModule {}
