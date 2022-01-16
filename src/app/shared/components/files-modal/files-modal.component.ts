import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FileModalData } from '../../types/file-modal-data';

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesModalComponent {
  @Input() files: FileModalData[] = [];
}
