import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { INestedPies } from 'src/app/interface';
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
  @Input() title: string;
  @Input() piesData: Observable<INestedPies>;
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
    this.piesData.subscribe((res) => {
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      res.countByName.forEach(o => {
        const osName = `${o._id.name} ${o._id.version || ''}`;
        this.option.series[1].data.push({ value: o.total, name: osName });
      });
    });
  }
}
