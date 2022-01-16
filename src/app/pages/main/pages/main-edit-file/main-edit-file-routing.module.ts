import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEditFileComponent } from './main-edit-file.component';

const routes: Routes = [{ path: '', component: MainEditFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainEditFileRoutingModule {}
