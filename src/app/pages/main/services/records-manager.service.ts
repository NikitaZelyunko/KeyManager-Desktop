import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, filter, first, switchMap, tap } from 'rxjs';
import { NewRecord } from '../modules/records/types/new-record-type';
import { RecordListItem } from '../modules/records/types/record-list-item.type';

@Injectable()
export class RecordsManagerService {
  private records$ = new BehaviorSubject<RecordListItem[] | null>(null);
  private idCount = 0;

  init() {
    const currentRecords = this.records$.value;
    if (!currentRecords) {
      this.records$.next(this.getInitRecords());
    }
  }

  private getInitRecords() {
    return [];
  }

  reset() {
    this.records$.next(this.getInitRecords());
  }

  getRecords() {
    return this.records$.pipe(filter(Boolean));
  }

  getLatestRecords() {
    return this.getRecords().pipe(first());
  }

  addRecord(record: NewRecord) {
    return this.getLatestRecords().pipe(
      tap((records) => {
        records.unshift({ id: this.idCount++, value: record });
        this.records$.next(records);
      })
    );
  }

  recordUpdate(index: number, value: NewRecord) {
    return this.getLatestRecords().pipe(
      switchMap((records) => {
        const record = records[index];
        if (record) {
          record.value = value;
        }
        return EMPTY;
      })
    );
  }

  recordDelete(index: number) {
    return this.getLatestRecords().pipe(
      tap((records) => {
        records.splice(index, 1);
        this.records$.next(records);
      })
    );
  }
}
