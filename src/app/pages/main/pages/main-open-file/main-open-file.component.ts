import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilesForEncrypt } from '../../modules/files-for-encrypt-form/types/files-for-encrypt';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

@Component({
  selector: 'app-main-open-file',
  templateUrl: './main-open-file.component.html',
  styleUrls: ['./main-open-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainOpenFileComponent {
  records$ = this.drm.getDecryptedResult();

  constructor(private drm: DecryptionResultManagerService) {}

  onFilesUpload(files: FilesForEncrypt) {
    this.drm.pushFiles(files.private, files.data);
  }
}
