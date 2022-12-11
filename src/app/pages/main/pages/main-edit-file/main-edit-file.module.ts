import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainEditFileRoutingModule } from './main-edit-file-routing.module';
import { MainEditFileComponent } from './main-edit-file.component';
import { FilesForEncryptFormModule } from '../../modules/files-for-encrypt-form/files-for-encrypt-form.module';
import { RecordsEditableDisplayModule } from '../../modules/records-editable-display/records-editable-display.module';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';
import { KeysManagerService } from '../../services/keys-manager.service';
import { FileInputModule } from 'src/app/ui-kit/file-input/file-input.module';

@NgModule({
  declarations: [MainEditFileComponent],
  imports: [
    CommonModule,
    MainEditFileRoutingModule,
    FilesForEncryptFormModule,
    RecordsEditableDisplayModule,
    SharedModule,
    FileInputModule,
  ],
  providers: [
    DecryptionResultManagerService,
    KeysManagerService,
    RecordsManagerService,
    EncryptionFileManagerService,
  ],
})
export class MainEditFileModule {}
