import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NewRecord } from '../../types/new-record-type';

type RecordListItem = { id: number; value: NewRecord };

@Component({
  selector: 'app-records-block',
  templateUrl: './records-block.component.html',
  styleUrls: ['./records-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsBlockComponent implements OnInit {
  records: RecordListItem[] = [];
  private idCount = 0;

  recordIdentify(index: number, record: RecordListItem) {
    return record.id;
  }

  createEmptyRecord(): NewRecord {
    return { login: '', password: '' };
  }

  recordUpdate(index: number, value: NewRecord) {
    const record = this.records[index];
    if (record) {
      record.value = value;
    }
    if (index === 0) {
      this.createFirstEmptyRecord();
    }
  }

  createFirstEmptyRecord() {
    this.records.unshift({ id: this.idCount++, value: this.createEmptyRecord() });
  }

  recordDelete(index: number) {
    this.records.splice(index, 1);
  }

  ngOnInit() {
    this.createFirstEmptyRecord();
  }
}
