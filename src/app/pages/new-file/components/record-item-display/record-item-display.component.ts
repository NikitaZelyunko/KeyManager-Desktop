import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NewRecord } from '../../types/new-record-type';

@Component({
  selector: 'app-record-item-display',
  templateUrl: './record-item-display.component.html',
  styleUrls: ['./record-item-display.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordItemDisplayComponent {
  @Input() record!: NewRecord;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  get login() {
    return this.record.login;
  }

  get password() {
    return this.record.password;
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
