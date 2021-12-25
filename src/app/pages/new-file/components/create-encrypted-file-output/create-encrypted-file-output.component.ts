import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';

@Component({
  selector: 'app-create-encrypted-file-output',
  templateUrl: './create-encrypted-file-output.component.html',
  styleUrls: ['./create-encrypted-file-output.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEncryptedFileOutputComponent {
  constructor(private efm: EncryptionFileManagerService, private rm: RecordsManagerService) {}

  submit() {
    this.efm.createFile().subscribe({
      error: () => {},
      complete: () => {
        this.rm.reset();
      },
    });
  }
}
