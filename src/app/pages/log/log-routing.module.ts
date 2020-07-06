import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'charts' },
  { path: 'charts', component: ChartsComponent },
  { path: 'detail', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
