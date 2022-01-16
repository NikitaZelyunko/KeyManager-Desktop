import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainOpenFileComponent } from './main-open-file.component';

const routes: Routes = [{ path: '', component: MainOpenFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainOpenFileRoutingModule {}
