import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, tap } from 'rxjs';
import { FileReaderService } from 'src/app/core/services/file-reader.service';
import { FilesForEncrypt } from '../../types/files-for-encrypt';

type ControlNames = 'private' | 'data';

// TODO этот компонент с файлами для дешифрования(decrypt). Нужно переименовать.

@Component({
  selector: 'app-files-for-encrypt-form',
  templateUrl: './files-for-encrypt-form.component.html',
  styleUrls: ['./files-for-encrypt-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesForEncryptFormComponent {
  @Output() filesUpload = new EventEmitter<FilesForEncrypt>();
  form = this.fb.group({
    private: this.fb.control(null as ArrayBuffer | null, Validators.required),
    data: this.fb.control(null as ArrayBuffer | null, Validators.required),
  });
  constructor(private fb: FormBuilder, private fileReader: FileReaderService) {}

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
        return this.fileReader
          .readAsArrayBuffer(file)
          .pipe(tap((fileResult) => this.form.controls[control].patchValue(fileResult)));
      }
    }
    return EMPTY;
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (!formValue.private || !formValue.data) {
      this.form.markAllAsTouched();
      return;
    }

    this.filesUpload.emit(formValue as FilesForEncrypt);
  }
}
