import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';
import { FilterResultType } from '../../../records/types/filter-result-type';
import { NewRecord } from '../../../records/types/new-record-type';
import { recordIdentify, RecordListItem } from '../../../records/types/record-list-item.type';
import { createEmptyRecord } from '../../../records/utils/create-empty-record';

@Component({
  selector: 'app-editable-records-list',
  templateUrl: './editable-records-list.component.html',
  styleUrls: ['./editable-records-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableRecordsListComponent {
  @Input() records: RecordListItem[] = [];
  @Input() filterResult: FilterResultType | null = null;
  @Input() newRecord = createEmptyRecord();

  constructor(
    // Должен быть доступен в месте использования
    private recordsService: RecordsManagerService
  ) {}

  recordTrackBy(index: number, record: RecordListItem) {
    return recordIdentify(record);
  }

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  onNewSave(record: NewRecord) {
    this.recordsService.addRecord(record).subscribe({
      complete: () => {
        this.newRecord = createEmptyRecord();
      },
    });
  }

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  recordUpdate(index: number, value: NewRecord) {
    this.recordsService.recordUpdate(index, value).subscribe();
  }

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  recordDelete(index: number) {
    this.recordsService.recordDelete(index).subscribe();
  }
}
