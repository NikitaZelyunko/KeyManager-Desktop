import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO названия маршрутов(path) надо выносить в отдельный файл

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'prefix' },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
