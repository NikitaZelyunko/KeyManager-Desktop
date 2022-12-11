import { Component, ChangeDetectionStrategy } from '@angular/core';
import { finalize, map } from 'rxjs';
import { isPendingValue, PendingValue } from 'src/app/types/loading-value';
import { LoadingValue } from 'src/app/utils/loading-value';
import { FilesForEncrypt } from '../../modules/files-for-encrypt-form/types/files-for-encrypt';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';
import { KeysManagerService } from '../../services/keys-manager.service';

@Component({
  selector: 'app-main-open-file',
  templateUrl: './main-open-file.component.html',
  styleUrls: ['./main-open-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainOpenFileComponent {
  records$ = this.drm.getDecryptedResult().pipe(
    // TODO превратить это в оператор
    map(
      (value): LoadingValue<Exclude<typeof value, PendingValue>> =>
        isPendingValue(value) ? { loading: true } : { value, loading: false }
    ),
    finalize(() => {
      this.drm.reset();
    })
  );

  constructor(
    private drm: DecryptionResultManagerService,
    private keysManager: KeysManagerService
  ) {}

  onFilesUpload(files: FilesForEncrypt) {
    this.drm.setEncryptedData(files.data);
    this.keysManager.setKeyFile(files.private, 'privateKey');
  }
}
