import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import echarts from 'echarts';
import getOption from './option.echarts';
import { HttpService } from '../../http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild('bar', { static: true }) bar: ElementRef;
  @Input() title: string;
  @Input() barData: Observable<any>;
  barChart: echarts.ECharts = null;
  option: echarts.EChartOption = getOption();

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    this.barChart = echarts.init(this.bar.nativeElement);
    this.setOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setOption(): void {
    this.setStaticOption();
    this.barData.subscribe(res => {
      debugger;
      this.option.xAxis.data = res.date;
      this.option.series[0].data = res.pv;
      this.option.series[1].data = res.uv;
      console.log(this.option);
      this.barChart.setOption(this.option);
      console.log(this.option);
    });
  }
}
