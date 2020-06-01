import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import echarts from 'echarts';
import { Observable } from 'rxjs';
import { IPieData } from 'src/app/interface';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit {
  @ViewChild('pie', { static: true }) pie: ElementRef;
  @Input() title: string;
  @Input() pieData: Observable<IPieData>;
  pieChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    this.pieChart = echarts.init(this.pie.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.pieChart.resize());
    elementResizeDetectorMaker().listenTo(this.pie.nativeElement, () => this.pieChart.resize());
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.series[0].name = '响应状态';
  }

  setDynamicOption(): void {
    this.pieData.subscribe((res) => {
      this.option.legend.data = res.legendData;
      this.option.series[0].data = res.seriesData;
      this.pieChart.setOption(this.option);
    });
  }
}
