import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RecordsManagerService } from '../../services/records-manager.service';
import { NewRecord } from '../../types/new-record-type';
import { recordIdentify, RecordListItem } from '../../types/record-list-item.type';
@Component({
  selector: 'app-records-block',
  templateUrl: './records-block.component.html',
  styleUrls: ['./records-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsBlockComponent implements OnInit {
  records$ = this.recordsService.getRecords();

  constructor(private recordsService: RecordsManagerService) {}

  recordTrackBy(index: number, record: RecordListItem) {
    return recordIdentify(record);
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

  ngOnInit() {
    this.recordsService.init();
  }
}
