import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { IBLData } from 'src/app/interface';
import { echarts } from '../macarons.theme';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @ViewChild('line', { static: true }) line: ElementRef;
  @Input() title: string;
  @Input() lineData: Observable<IBLData> = null;
  lineChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    this.lineChart = echarts.init(this.line.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.xAxis[0].name = '小时';
    this.option.series[0].stack = '总量';
    this.option.series[0].name = '访问量';
  }

  setDynamicOption(): void {
    this.lineData.subscribe(res => {
      this.option.xAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.lineChart.setOption(this.option);
    });
  }
}
