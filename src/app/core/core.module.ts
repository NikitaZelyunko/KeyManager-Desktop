import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FileCreatorService } from './services/file-creator.service';
import { CryptoService } from './services/crypto.service';
import { ElectronService } from './services/electron.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  providers: [FileCreatorService, CryptoService, ElectronService],
})
export class CoreModule {
  constructor() {
    // TODO создать проверку на то, что данный модуль создается только один раз
  }
}
