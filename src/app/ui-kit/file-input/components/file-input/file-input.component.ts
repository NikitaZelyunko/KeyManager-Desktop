import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FileInputValue = File[] | null;
type Value = FileInputValue;

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: FileInputComponent,
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @Output() valueChange = new EventEmitter<Value>();

  onChange: (value: Value) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: this['onChange']): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: this['onTouched']): void {
    this.onTouched = fn;
  }

  writeValue(): void {}

  // TODO сделать чтобы обработка прекращалась при новом вызове
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;
    const files = fileList && Array.from(fileList);
    this.onTouched();
    this.onChange(files);
    this.valueChange.emit(files);
  }
}
