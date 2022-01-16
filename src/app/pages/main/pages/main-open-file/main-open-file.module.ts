import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainOpenFileRoutingModule } from './main-open-file-routing.module';
import { MainOpenFileComponent } from './main-open-file.component';
import { RecordsReadonlyDisplayModule } from '../../modules/records-readonly-display/records-readonly-display.module';
import { FilesForEncryptFormModule } from '../../modules/files-for-encrypt-form/files-for-encrypt-form.module';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

@NgModule({
  declarations: [MainOpenFileComponent],
  imports: [
    CommonModule,
    MainOpenFileRoutingModule,
    RecordsReadonlyDisplayModule,
    FilesForEncryptFormModule,
  ],
  providers: [DecryptionResultManagerService],
})
export class MainOpenFileModule {}
