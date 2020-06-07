import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IEchartsNestedPiesData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';

@Component({
  selector: 'app-nested-pies',
  templateUrl: './nested-pies.component.html',
  styleUrls: ['./nested-pies.component.css'],
})
export class NestedPiesComponent implements OnInit {
  @ViewChild('nestedPies', { static: true }) pies: ElementRef;
  Ititle: string;
  @Input()
  set title(value: string) {
    this.Ititle = value;
    this.option.title.text = value;
  }
  get title(): string {
    return this.Ititle;
  }
  IpiesData: Observable<IEchartsNestedPiesData> = null;
  @Input()
  set piesData(data: Observable<IEchartsNestedPiesData>) {
    this.IpiesData = data;
    this.setDynamicOption();
  }
  get piesData(): Observable<IEchartsNestedPiesData> {
    return this.IpiesData;
  }
  isSpinning = false;
  piesChart = null;
  option = getOption();

  constructor() { }

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    this.piesChart = echarts.init(this.pies.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.piesChart.resize());
    elementResizeDetectorMaker().listenTo(this.pies.nativeElement, () => this.piesChart.resize());
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.series[0].name = this.option.series[1].name = '访问来源';
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.piesData.subscribe((res) => {
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      res.countByVersion.forEach(o => {
        const osName = o._id ? `${o._id.name} ${o._id.version || ''}` : '';
        this.option.series[1].data.push({ value: o.total, name: osName });
      });
      res.countByName.forEach(o => {
        this.option.series[0].data.push({ value: o.total, name: o._id});
      });
      this.piesChart.setOption(this.option);
      this.isSpinning = false;
    });
  }
}
