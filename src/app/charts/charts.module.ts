import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { PieComponent } from './pie/pie.component';
import { NestedPiesComponent } from './nested-pies/nested-pies.component';

@NgModule({
  declarations: [BarComponent, LineComponent, PieComponent, NestedPiesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BarComponent, LineComponent, PieComponent
  ]
})
export class ChartsModule { }
