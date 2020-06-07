import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { PieComponent } from './pie/pie.component';
import { NestedPiesComponent } from './nested-pies/nested-pies.component';
import { ChinaMapComponent } from './china-map/china-map.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';

@NgModule({
  declarations: [BarComponent, LineComponent, PieComponent, NestedPiesComponent, ChinaMapComponent, VerticalBarComponent],
  imports: [
    CommonModule, NzSpinModule
  ],
  exports: [
    BarComponent, LineComponent, PieComponent, NestedPiesComponent, ChinaMapComponent, VerticalBarComponent
  ]
})
export class ChartsModule { }
