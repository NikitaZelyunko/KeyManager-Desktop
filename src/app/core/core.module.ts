import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FileCreatorService } from './services/file-creator.service';
import { CryptoService } from './services/crypto.service';
import { ElectronService } from './services/electron.service';
import { ModalsModule } from '../modals/modals.module';
import { FileReaderService } from './services/file-reader.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ModalsModule],
  exports: [HeaderComponent, ModalsModule],
  providers: [FileCreatorService, CryptoService, ElectronService, FileReaderService],
})
export class CoreModule {
  constructor() {
    // TODO создать проверку на то, что данный модуль создается только один раз
  }
}
