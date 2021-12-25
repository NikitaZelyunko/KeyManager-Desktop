import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenFileComponent } from './open-file.component';

const routes: Routes = [{ path: '', component: OpenFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenFileRoutingModule {}
