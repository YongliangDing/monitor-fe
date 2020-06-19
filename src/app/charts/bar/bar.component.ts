import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IEchartsCommonData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';
import { CommunicateService } from 'src/app/communicate.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  @ViewChild('bar', { static: true }) bar: ElementRef;
  @Input() title: string;
  ISubTitle: string;
  @Input()
  set subTitle(value: string) {
    this.ISubTitle = value;
    this.option.title.subtext = value;
  }
  get subTitle() {
    return this.ISubTitle;
  }
  IbarData: Observable<IEchartsCommonData> = null;
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

  constructor(private communicate: CommunicateService) {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    let lastParam = '';
    this.barChart = echarts.init(this.bar.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
    this.barChart.on('click', param => {
      if (lastParam === param.name) {
        return;
      } else {
        lastParam = param.name;
      }
      this.communicate.sendMessage(JSON.stringify({
        sender: 'barCmpt',
        message: [new Date(param.name).setHours(0, 0, 0), new Date(param.name).setHours(23, 59, 59)]
      }));
    });
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
      this.option.legend.data = res.legendData;
      this.option.xAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.option.series[1].data = res.seriesData2;
      this.barChart.setOption(this.option);
      this.isSpinning = false;
    });
  }
}
