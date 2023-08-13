import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  Optional,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NewRecord } from '../../types/new-record-type';
import { RecordCreateFormActions } from './record-create-form-actions.service';
import { simplePasswordGenerator } from 'src/app/features/password-generator/simple-password-generator/simple-password-generator';

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

  // Лучше не использовать output для целей отслеживания изменений
  // Лучше сделать input с subject

  form: UntypedFormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    login: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  } as Record<keyof NewRecord, unknown>);

  constructor(private fb: UntypedFormBuilder, @Optional() actions: RecordCreateFormActions) {}

  private updateFormValue(value: NewRecord) {
    this.form.setValue(value);
  }

  generatePassword() {
    const password = simplePasswordGenerator();
    this.form.patchValue({ password });
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
