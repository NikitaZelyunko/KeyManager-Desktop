import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesForEncryptFormComponent } from './components/files-for-encrypt-form/files-for-encrypt-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilesForEncryptFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FilesForEncryptFormComponent],
})
export class FilesForEncryptFormModule {}
