import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import echarts from 'echarts';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { ICountObj } from 'src/app/interface';
import macaronsTheme from '../macarons.theme';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @ViewChild('line', { static: true }) line: ElementRef;
  @Input() title: string;
  @Input() lineData: Observable<ICountObj[]> = null;
  lineChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    echarts.registerTheme('macarons', macaronsTheme);
    this.lineChart = echarts.init(this.line.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.lineData.subscribe(res => {
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      res.forEach(o => {
        this.option.xAxis[0].data.push(o._id);
        this.option.series[0].data.push(o.total);
      });
      this.lineChart.setOption(this.option);
    });
  }
}
