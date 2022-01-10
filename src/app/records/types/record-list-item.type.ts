import { NewRecord } from './new-record-type';

export type RecordListItem = { id: number; value: NewRecord };

export function recordIdentify(record: RecordListItem) {
  return record.id;
}
