import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable, tap } from 'rxjs';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

type ControlNames = 'key' | 'data';
type FormValue = Record<ControlNames, ArrayBuffer | null>;

@Component({
  selector: 'app-upload-files-block',
  templateUrl: './upload-files-block.component.html',
  styleUrls: ['./upload-files-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFilesBlockComponent {
  form = this.fb.group({
    key: this.fb.control(null, Validators.required),
    data: this.fb.control(null, Validators.required),
  });
  constructor(private fb: FormBuilder, private drm: DecryptionResultManagerService) {}

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

  submit() {
    if (this.form.valid) {
      const formValue: FormValue = this.form.value;
      if (formValue.key && formValue.data) {
        this.drm.pushFiles(formValue.key, formValue.data);
        return;
      }
    }
    this.form.markAllAsTouched();
  }
}
