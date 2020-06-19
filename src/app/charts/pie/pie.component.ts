import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import echarts from 'echarts';
import { Observable } from 'rxjs';
import { IEchartsPieData } from 'src/app/interface';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit {
  @ViewChild('pie', { static: true }) pie: ElementRef;
  ITitle: string;
  @Input()
  set title(value: string) {
    this.ITitle = value;
    this.option.title.text = value;
  }
  get title(): string {
    return this.ITitle;
  }
  ISubTitle: string;
  @Input()
  set subTitle(value: string) {
    this.ISubTitle = value;
    this.option.title.subtext = value;
  }
  get subTitle() {
    return this.ISubTitle;
  }
  IpieData: Observable<IEchartsPieData> = null;
  @Input()
  set pieData(data: Observable<IEchartsPieData>) {
    this.IpieData = data;
    this.setDynamicOption();
  }
  get pieData(): Observable<IEchartsPieData> {
    return this.IpieData;
  }
  isSpinning = false;
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
    this.isSpinning = true;
    this.pieData.subscribe((res) => {
      this.option.legend.data = res.legendData;
      this.option.series[0].data = res.seriesData;
      this.pieChart.setOption(this.option);
      this.isSpinning = false;
    });
  }
}
