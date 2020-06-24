import './china';
import getOption from './echarts.option';
import { echarts } from '../macarons.theme';
import elementResizeDetectorMaker from 'element-resize-detector';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { IAggregateResult } from 'src/app/interface';
import { Observable } from 'rxjs';
import { Table2ExcelService } from 'src/app/services/table2excel/table2excel.service';

@Component({
  selector: 'app-china-map',
  templateUrl: './china-map.component.html',
  styleUrls: ['./china-map.component.css'],
})
export class ChinaMapComponent implements OnInit, OnChanges {
  @ViewChild('map', { static: true }) map: ElementRef;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() mapData: Observable<IAggregateResult[]>;
  @Input() seriesName: [string[], string];
  isSpinning = false;
  option = getOption();
  mapChart = null;

  constructor(private table2excel: Table2ExcelService) {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  ngOnChanges() {
    this.setStaticOption();
    this.setDynamicOption();
  }

  drawChart(): void {
    this.mapChart = echarts.init(this.map.nativeElement, 'macarons');
    this.setStaticOption();
    this.initDataView();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.mapChart.resize());
    elementResizeDetectorMaker().listenTo(this.map.nativeElement, () =>
      this.mapChart.resize()
    );
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.title.subtext = this.subTitle;
    this.option.series[0].name = this.seriesName[0][0];
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.mapData.subscribe((res) => {
      this.option.series[0].data.forEach((o) => {
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

  initDataView() {
    this.option.toolbox.feature.dataView.lang = [
      this.option.title.text,
      '关闭',
      '导出数据',
    ];
    this.option.toolbox.feature.dataView.contentToOption = (
      container: HTMLElement
    ) => {
      this.table2excel.exportExcel(
        container.querySelector('table'),
        this.option.title.text
      );
    };
    this.option.toolbox.feature.dataView.optionToContent = (opt) => {
      console.log(opt);
      const series = opt.series[0].data;
      let table = `<table style='width:100%;text-align:center;' border='1' cellspacing='0'>
                    <tbody>
                    <tr>
                    <th>${this.seriesName[1]}</th>`;
      opt.series.forEach(val => (table += `<th>${val.name}</th>`));
      table += '</tr>';
      series.forEach(s => table += `<tr><td>${s.name}</td><td>${s.value}</td></tr>`);
      for (let i = 0, l = series.length; i < l; i++) {}
      table += '</tbody></table>';
      return table;
    };
  }
}
