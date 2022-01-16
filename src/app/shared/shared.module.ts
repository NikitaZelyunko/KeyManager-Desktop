import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesModalComponent } from './components/files-modal/files-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilesModalComponent],
  exports: [FilesModalComponent],
})
export class SharedModule {}
