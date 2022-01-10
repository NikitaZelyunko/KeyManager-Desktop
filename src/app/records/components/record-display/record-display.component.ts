import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NewRecord } from 'src/app/records/types/new-record-type';

@Component({
  selector: 'app-record-display',
  templateUrl: './record-display.component.html',
  styleUrls: ['./record-display.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordDisplayComponent {
  @Input() record!: NewRecord;
  @Input() editable!: boolean;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  get title() {
    return this.record.title;
  }

  get description() {
    return this.record.description;
  }

  get login() {
    return this.record.login;
  }

  get password() {
    return this.record.password;
  }

  onEdit() {
    if (this.editable) {
      this.edit.emit();
    }
  }

  onDelete() {
    if (this.editable) {
      this.delete.emit();
    }
  }
}
