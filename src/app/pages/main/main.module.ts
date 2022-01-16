import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StartModeBlockComponent } from './components/start-mode-block/start-mode-block.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, StartModeBlockComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule],
})
export class MainModule {}
