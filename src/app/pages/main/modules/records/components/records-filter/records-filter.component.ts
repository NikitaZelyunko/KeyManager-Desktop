import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterResultType } from '../../types/filter-result-type';

@Component({
  selector: 'app-records-filter',
  templateUrl: './records-filter.component.html',
  styleUrls: ['./records-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsFilterComponent {
  @Output() search = new EventEmitter<FilterResultType>();
  form = this.fb.group({
    searchString: this.fb.control(''),
  });
  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.search.emit(this.form.value as FilterResultType);
    }
  }
}
