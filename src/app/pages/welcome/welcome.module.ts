import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { ChartsModule } from 'src/app/charts/charts.module';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  imports: [WelcomeRoutingModule, ChartsModule, NzGridModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
