import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainEditFileRoutingModule } from './main-edit-file-routing.module';
import { MainEditFileComponent } from './main-edit-file.component';

@NgModule({
  declarations: [MainEditFileComponent],
  imports: [CommonModule, MainEditFileRoutingModule],
})
export class MainEditFileModule {}
