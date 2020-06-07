import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { IEchartsCommonData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {
  @ViewChild('line', { static: true }) line: ElementRef;
  Ititle: string;
  @Input()
  set title(value: string) {
    this.Ititle = value;
    this.option.title.text = value;
  }
  get title(): string {
    return this.Ititle;
  }
  IlineData: Observable<IEchartsCommonData> = null;
  @Input()
  set lineData(data: Observable<IEchartsCommonData>) {
    this.IlineData = data;
    this.setDynamicOption();
  }
  get lineData(): Observable<IEchartsCommonData> {
    return this.IlineData;
  }
  isSpinning = false;
  lineChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    this.lineChart = echarts.init(this.line.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.lineChart.resize());
    elementResizeDetectorMaker().listenTo(this.line.nativeElement, () => this.lineChart.resize());
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.xAxis.name = '小时';
    // this.option.series[0].name = '访问量';
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.lineData.subscribe(res => {
      this.option.xAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.lineChart.setOption(this.option);
      this.isSpinning = false;
    });
  }
}
