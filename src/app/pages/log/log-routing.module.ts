import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'charts' },
  { path: 'charts', component: ChartsComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
