import { Component, ChangeDetectionStrategy } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs';
import { RadioGroupVariant } from 'src/app/shared/components/radio-group/radio-group-variant';
import { FilesForEncrypt } from '../../modules/files-for-encrypt-form/types/files-for-encrypt';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';

type KeysForSaveMode = 'useCurrent' | 'createNew';

@Component({
  selector: 'app-main-edit-file',
  templateUrl: './main-edit-file.component.html',
  styleUrls: ['./main-edit-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainEditFileComponent {
  records$ = this.drm.getDecryptedResult().pipe(
    tap((records) => {
      this.recordsService.reInit(records);
    }),
    switchMap(() => this.recordsService.getRecords()),
    finalize(() => {
      this.drm.reset();
      this.recordsService.reset();
    })
  );

  readonly keysForSaveModeVariants: RadioGroupVariant<KeysForSaveMode>[] = [
    {
      label: 'Use current',
      value: 'useCurrent',
      checked: false,
    },
    {
      label: 'Create new',
      value: 'createNew',
      checked: false,
    },
  ];

  keysForSaveMode: KeysForSaveMode = 'useCurrent';

  constructor(
    private drm: DecryptionResultManagerService,
    private recordsService: RecordsManagerService
  ) {}

  onFilesUpload(files: FilesForEncrypt) {
    this.drm.pushFiles(files.private, files.data);
  }

  onSave() {}
}
