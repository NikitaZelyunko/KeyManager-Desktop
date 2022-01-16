import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNewFileRoutingModule } from './main-new-file-routing.module';
import { MainNewFileComponent } from './main-new-file.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';
import { RecordsEditableDisplayModule } from '../../modules/records-editable-display/records-editable-display.module';

@NgModule({
  declarations: [MainNewFileComponent],
  imports: [CommonModule, MainNewFileRoutingModule, RecordsEditableDisplayModule, SharedModule],
  providers: [RecordsManagerService, EncryptionFileManagerService],
})
export class MainNewFileModule {}
