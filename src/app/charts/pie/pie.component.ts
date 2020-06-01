import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import echarts from 'echarts';
import { Observable } from 'rxjs';
import { IPieData } from 'src/app/interface';
import macaronsTheme from '../macarons.theme';
import getOption from './echarts.option';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  @ViewChild('pie', { static: true }) pie: ElementRef;
  @Input() title: string;
  @Input() pieData: Observable<IPieData>;
  pieChart = null;
  option = getOption();

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    echarts.registerTheme('macarons', macaronsTheme);
    this.pieChart = echarts.init(this.pie.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.pieData.subscribe(res => {
      this.option.legend.data = res.legendData;
      this.option.series[0].data = res.seriesData;
      this.pieChart.setOption(this.option);
    });
  }

}
