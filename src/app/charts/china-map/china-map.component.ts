import './china';
import getOption from './echarts.option';
import { echarts } from '../macarons.theme';
import elementResizeDetectorMaker from 'element-resize-detector';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IAggregateResult } from 'src/app/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-china-map',
  templateUrl: './china-map.component.html',
  styleUrls: ['./china-map.component.css']
})
export class ChinaMapComponent implements OnInit {
  @ViewChild('map', { static: true }) map: ElementRef;
  Ititle: string;
  @Input()
  set title(value: string) {
    this.Ititle = value;
    this.option.title.text = value;
  }
  get title(): string {
    return this.Ititle;
  }
  ImapData: Observable<IAggregateResult[]>;
  @Input()
  set mapData(data: Observable<IAggregateResult[]>) {
    this.ImapData = data;
    this.setDynamicOption();
  }
  get mapData(): Observable<IAggregateResult[]> {
    return this.ImapData;
  }
  isSpinning = false;
  option = getOption();
  mapChart = null;

  constructor() { }

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  drawChart(): void {
    this.mapChart = echarts.init(this.map.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.mapChart.resize());
    elementResizeDetectorMaker().listenTo(this.map.nativeElement, () => this.mapChart.resize());
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.mapData.subscribe(res => {
      this.option.series[0].data.forEach(o => {
        o.value = 0;
        for (const aggregateResult of res) {
          if (aggregateResult._id === o.name) {
            o.value = aggregateResult.total;
            break;
          }
        }
      });
      this.mapChart.setOption(this.option);
      this.isSpinning = false;
    });
  }

}
