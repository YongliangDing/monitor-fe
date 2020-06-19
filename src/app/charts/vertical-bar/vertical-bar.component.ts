import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IEchartsCommonData } from 'src/app/interface';
import getOption from './echarts.option';
import { echarts } from '../macarons.theme';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.css']
})
export class VerticalBarComponent implements OnInit {
  @ViewChild('verticalBar', { static: true }) bar: ElementRef;
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
  IbarData: Observable<IEchartsCommonData>;
  @Input()
  set barData(data: Observable<IEchartsCommonData>) {
    this.IbarData = data;
    this.setDynamicOption();
  }
  get barData(): Observable<IEchartsCommonData> {
    return this.IbarData;
  }
  isSpinning = false;
  barChart = null;
  option = getOption();
  constructor() { }

  ngOnInit(): void {
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
    this.isSpinning = true;
    this.barData.subscribe((res) => {
      this.option.yAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.barChart.setOption(this.option);
      this.isSpinning = false;
    });
  }

}
