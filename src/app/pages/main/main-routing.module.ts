import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'prefix',
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./pages/main-new-file/main-new-file.module').then((m) => m.MainNewFileModule),
      },
      {
        path: 'open',
        loadChildren: () =>
          import('./pages/main-open-file/main-open-file.module').then((m) => m.MainOpenFileModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./pages/main-edit-file/main-edit-file.module').then((m) => m.MainEditFileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
