import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterResultType } from '../../../records/types/filter-result-type';
import { recordIdentify, RecordListItem } from '../../../records/types/record-list-item.type';

@Component({
  selector: 'app-readonly-records-list',
  templateUrl: './readonly-records-list.component.html',
  styleUrls: ['./readonly-records-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyRecordsListComponent {
  @Input() records: RecordListItem[] = [];

  filterResult: FilterResultType | null = null;

  recordTrackBy(index: number, record: RecordListItem) {
    return recordIdentify(record);
  }
}
