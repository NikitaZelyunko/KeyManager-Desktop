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
  @Output() search = new EventEmitter<FilterResultType | null>();
  form = this.fb.group({
    searchString: this.fb.control(''),
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;

    if (formValue.searchString === null) {
      this.search.emit(null);
      return;
    } else {
      this.search.emit(formValue as FilterResultType);
    }
  }
}
