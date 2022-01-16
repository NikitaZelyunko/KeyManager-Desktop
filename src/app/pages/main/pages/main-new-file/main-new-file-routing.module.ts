import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNewFileComponent } from './main-new-file.component';

const routes: Routes = [{ path: '', component: MainNewFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainNewFileRoutingModule {}
