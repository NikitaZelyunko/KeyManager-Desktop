import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewFileRoutingModule } from './new-file-routing.module';
import { NewFileComponent } from './new-file.component';
// eslint-disable-next-line max-len
import { RecordCreateFormComponent } from './components/record-create-form/record-create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordItemComponent } from './components/record-item/record-item.component';
import { RecordsBlockComponent } from './components/records-block/records-block.component';
// eslint-disable-next-line max-len
import { RecordItemDisplayComponent } from './components/record-item-display/record-item-display.component';
import { RecordsManagerService } from './services/records-manager.service';
// eslint-disable-next-line max-len
import { EncryptionParametersBlockComponent } from './components/encryption-parameters-block/encryption-parameters-block.component';
// eslint-disable-next-line max-len
import { CreateEncryptedFileBlockComponent } from './components/create-encrypted-file-block/create-encrypted-file-block.component';
// eslint-disable-next-line max-len
import { CreateEncryptedFileOutputComponent } from './components/create-encrypted-file-output/create-encrypted-file-output.component';
import { EncryptionFileManagerService } from './services/encryption-file-manager.service';

@NgModule({
  declarations: [
    NewFileComponent,
    RecordCreateFormComponent,
    RecordItemComponent,
    RecordsBlockComponent,
    RecordItemDisplayComponent,
    EncryptionParametersBlockComponent,
    CreateEncryptedFileBlockComponent,
    CreateEncryptedFileOutputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NewFileRoutingModule],
  providers: [RecordsManagerService, EncryptionFileManagerService],
})
export class NewFileModule {}
