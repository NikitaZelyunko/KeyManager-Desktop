import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainEditFileRoutingModule } from './main-edit-file-routing.module';
import { MainEditFileComponent } from './main-edit-file.component';
import { FilesForEncryptFormModule } from '../../modules/files-for-encrypt-form/files-for-encrypt-form.module';
import { RecordsEditableDisplayModule } from '../../modules/records-editable-display/records-editable-display.module';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainEditFileComponent],
  imports: [
    CommonModule,
    MainEditFileRoutingModule,
    FilesForEncryptFormModule,
    RecordsEditableDisplayModule,
    SharedModule,
  ],
  providers: [DecryptionResultManagerService, RecordsManagerService],
})
export class MainEditFileModule {}
