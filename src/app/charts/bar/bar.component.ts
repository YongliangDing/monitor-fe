import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IBLData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  @ViewChild('bar', { static: true }) bar: ElementRef;
  @Input() title: string;
  @Input() barData: Observable<IBLData>;
  barChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    this.barChart = echarts.init(this.bar.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.barChart.resize());
    elementResizeDetectorMaker().listenTo(this.bar.nativeElement, () => this.barChart.resize());
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.barData.subscribe((res) => {
      this.option.legend.data = res.legendData;
      this.option.xAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.option.series[1].data = res.seriesData2;
      this.barChart.setOption(this.option);
    });
  }
}
