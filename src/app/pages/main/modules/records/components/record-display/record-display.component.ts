import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { NAVIGATOR } from 'src/app/core/tokens/navigator-token';
import { NewRecord } from '../../types/new-record-type';

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

  constructor(@Inject(NAVIGATOR) private navigator: Navigator) {}

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

  onLoginCopy() {
    // TODO сделать уведомление об успешном копировании в буфер
    this.navigator.clipboard.writeText(this.login);
  }

  onPasswordCopy() {
    // TODO сделать уведомление об успешном копировании в буфер
    this.navigator.clipboard.writeText(this.password);
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
