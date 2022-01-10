import { Pipe, PipeTransform } from '@angular/core';
import { FilterResultType } from '../types/filter-result-type';
import { RecordListItem } from '../types/record-list-item.type';

@Pipe({
  name: 'recordsFilter',
})
export class RecordsFilterPipe implements PipeTransform {
  transform(records: RecordListItem[], filterResult: FilterResultType | null): RecordListItem[] {
    if (!filterResult) {
      return records;
    }
    const searchStr = filterResult.searchString.toLowerCase();
    return records.filter((record) => {
      let isFiltered = false;
      const value = record.value;
      const normalizedTitle = value.title.toLowerCase();
      isFiltered = normalizedTitle.includes(searchStr);
      return isFiltered;
    });
  }
}
