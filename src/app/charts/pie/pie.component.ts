import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import echarts from 'echarts';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { ICountObj } from 'src/app/interface';
import macaronsTheme from '../macarons.theme';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  @ViewChild('pie', { static: true }) pie: ElementRef;
  @Input() title: string;
  @Input() pieData: Observable<ICountObj[]>;
  pieChart = null;
  option = getOption();

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    echarts.registerTheme('macarons', macaronsTheme);
    this.pieChart = echarts.init(this.pie.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.pieData.subscribe(res => {
      this.option.legend.data = [];
      this.option.series[0].data = [];
      res.forEach(o => {
        this.option.legend.data.push(o._id);
        this.option.series[0].data.push({
          name: o._id,
          value: o.total
        });
      });
      this.pieChart.setOption(this.option);
    });
  }

}
