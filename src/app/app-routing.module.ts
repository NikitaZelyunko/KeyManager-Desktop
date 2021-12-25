import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO названия маршрутов(path) надо выносить в отдельный файл

const routes: Routes = [
  { path: '', redirectTo: 'new-file', pathMatch: 'prefix' },
  {
    path: 'new-file',
    loadChildren: () => import('./pages/new-file/new-file.module').then((m) => m.NewFileModule),
  },
  {
    path: 'open-file',
    loadChildren: () => import('./pages/open-file/open-file.module').then((m) => m.OpenFileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
