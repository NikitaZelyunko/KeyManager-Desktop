import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NewRecord } from '../../types/new-record-type';

type DisplayType = 'edit' | 'display' | 'create';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordItemComponent {
  private _record!: NewRecord;
  @Input() set record(value: NewRecord) {
    this._record = value;
    this.updateItemType();
  }
  get record() {
    return this._record;
  }

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  type: DisplayType = 'display';

  get isDisplay() {
    return this.type === 'display';
  }

  get isEdit() {
    return this.type === 'edit';
  }

  updateItemType() {
    if (!this.record.login || !this.record.password) {
      this.type = 'create';
    } else {
      this.type = 'display';
    }
  }

  onEdit() {
    this.type = 'edit';
  }

  onEditUndo() {
    this.type = 'display';
  }

  onSave(value: NewRecord) {
    this.type = 'display';
    this.update.emit(value);
  }

  onDelete() {
    this.delete.emit();
  }
}
