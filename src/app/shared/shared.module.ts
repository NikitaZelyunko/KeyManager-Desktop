import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesModalComponent } from './components/files-modal/files-modal.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilesModalComponent, RadioGroupComponent],
  exports: [FilesModalComponent, RadioGroupComponent],
})
export class SharedModule {}
