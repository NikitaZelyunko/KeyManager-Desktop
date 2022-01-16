import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsOverlayComponent } from './components/modals-overlay/modals-overlay.component';
import { ModalsService } from './services/modal.service';

@NgModule({
  declarations: [ModalsOverlayComponent],
  imports: [CommonModule],
  exports: [ModalsOverlayComponent],
  providers: [ModalsService],
})
export class ModalsModule {}
