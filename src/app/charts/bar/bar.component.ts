import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as echarts from 'echarts';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { ICountDateObj } from 'src/app/interface';
import macaronsTheme from '../macarons.theme';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild('bar', { static: true }) bar: ElementRef;
  @Input() title: string;
  @Input() barData: Observable<ICountDateObj> = null;
  barChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    echarts.registerTheme('macarons', macaronsTheme);
    this.barChart = echarts.init(this.bar.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.barData.subscribe(res => {
      this.option.xAxis[0].data = res.date;
      this.option.series[0].data = res.pv;
      this.option.series[1].data = res.uv;
      this.barChart.setOption(this.option);
    });
  }
}
