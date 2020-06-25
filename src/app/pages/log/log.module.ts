import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LogRoutingModule } from './log-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { TableComponent } from './table/table.component';
import { ChartsModule } from 'src/app/charts/charts.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  imports: [
    LogRoutingModule,
    ChartsModule,
    NzTableModule,
    NzGridModule,
    NzTabsModule,
    NzFormModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [ChartsComponent, TableComponent],
  exports: [ChartsComponent, TableComponent],
})
export class LogModule {}
