import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable, tap } from 'rxjs';
import { FilesForEncrypt } from '../../types/files-for-encrypt';

type ControlNames = 'private' | 'data';

@Component({
  selector: 'app-files-for-encrypt-form',
  templateUrl: './files-for-encrypt-form.component.html',
  styleUrls: ['./files-for-encrypt-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesForEncryptFormComponent {
  @Output() filesUpload = new EventEmitter<FilesForEncrypt>();
  form = this.fb.group({
    private: this.fb.control(null, Validators.required),
    data: this.fb.control(null, Validators.required),
  });
  constructor(private fb: FormBuilder) {}

  // TODO сделать чтобы обработка прекращалась при новом вызове
  onFileChange(control: ControlNames, event: Event) {
    this.createFileChange(control, event).subscribe();
  }

  private createFileChange(control: ControlNames, event: Event) {
    if (this.form.contains(control)) {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files?.length) {
        const file = files[0];
        return this.createFileRead(file).pipe(
          tap((fileResult) => this.form.controls[control].patchValue(fileResult))
        );
      }
    }
    return EMPTY;
  }

  // TODO вынести в отдельное место
  private createFileRead(file: File) {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.onload = () => {
        subscriber.next(reader.result);
        subscriber.complete();
      };
      reader.onerror = () => {
        subscriber.error();
        subscriber.complete();
      };
      reader.readAsArrayBuffer(file);
      return {
        unsubscribe() {
          reader.abort();
        },
      };
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue: FilesForEncrypt = this.form.value;
      if (formValue.private && formValue.data) {
        this.filesUpload.emit(formValue);
        return;
      }
    }
    this.form.markAllAsTouched();
  }
}
