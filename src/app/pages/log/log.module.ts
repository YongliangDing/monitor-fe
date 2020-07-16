import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LogRoutingModule } from './log-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'src/app/charts/charts.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CountUpModule } from 'ngx-countup';
import { TableComponent } from './detail/table/table.component';
import { FormComponent } from './detail/form/form.component';
import { DetailComponent } from './detail/detail.component';
import { StatisticsComponent } from './charts/statistics/statistics.component';

@NgModule({
  imports: [
    LogRoutingModule,
    ChartsModule,
    NzTableModule,
    NzGridModule,
    NzSpinModule,
    NzTabsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    CountUpModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ChartsComponent,
    TableComponent,
    FormComponent,
    DetailComponent,
    StatisticsComponent,
  ],
  exports: [ChartsComponent, DetailComponent],
})
export class LogModule {}
