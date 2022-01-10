import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewRecord } from '../../../../records/types/new-record-type';

@Component({
  selector: 'app-record-create-form',
  templateUrl: './record-create-form.component.html',
  styleUrls: ['./record-create-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordCreateFormComponent {
  @Input()
  set record(value: NewRecord) {
    this.updateFormValue(value);
  }

  @Output() save = new EventEmitter<NewRecord>();

  form: FormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    login: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  } as Record<keyof NewRecord, unknown>);

  constructor(private fb: FormBuilder) {}

  private updateFormValue(value: NewRecord) {
    this.form.setValue(value);
  }

  submit() {
    if (this.form.valid) {
      const formValue: NewRecord = this.form.value;
      this.save.emit(formValue);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
