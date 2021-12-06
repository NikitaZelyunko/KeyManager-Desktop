import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'new-file', pathMatch: 'prefix' },
  {
    path: 'new-file',
    loadChildren: () => import('./pages/new-file/new-file.module').then((m) => m.NewFileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
