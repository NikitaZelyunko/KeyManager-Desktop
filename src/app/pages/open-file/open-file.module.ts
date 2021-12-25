import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenFileRoutingModule } from './open-file-routing.module';
import { OpenFileComponent } from './open-file.component';
// eslint-disable-next-line max-len
import { UploadFilesBlockComponent } from './components/upload-files-block/upload-files-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DecryptionResultManagerService } from './services/decryption-result-manager.service';
// eslint-disable-next-line max-len
import { DecryptionResultBlockComponent } from './components/decryption-result-block/decryption-result-block.component';

@NgModule({
  declarations: [OpenFileComponent, UploadFilesBlockComponent, DecryptionResultBlockComponent],
  imports: [CommonModule, OpenFileRoutingModule, ReactiveFormsModule],
  providers: [DecryptionResultManagerService],
})
export class OpenFileModule {}
