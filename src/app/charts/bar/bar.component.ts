import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { IEchartsCommonData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import { Table2ExcelService } from 'src/app/services/table2excel/table2excel.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit, OnChanges {
  @ViewChild('bar', { static: true }) bar: ElementRef;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() barData: Observable<IEchartsCommonData> = null;
  @Input() seriesName: [string[], string];
  isSpinning = false;
  barChart = null;
  option = getOption();

  constructor(
    private communicate: CommunicateService,
    private table2excel: Table2ExcelService
  ) {}

  ngOnInit() {
    this.drawChart();
    this.addResizeDetector();
  }

  ngOnChanges() {
    this.setStaticOption();
    this.setDynamicOption();
  }

  drawChart(): void {
    this.barChart = echarts.init(this.bar.nativeElement, 'macarons');
    this.setStaticOption();
    this.initDataView();
    this.setDynamicOption();
    this.addChartEventListener();
  }

  addChartEventListener() {
    let lastParam = '';
    this.barChart.on('click', (param) => {
      if (lastParam === param.name) {
        return;
      }

      lastParam = param.name;
      this.communicate.sendMessage(
        JSON.stringify({
          sender: 'barCmpt',
          message: [
            new Date(param.name).setHours(0, 0, 0),
            new Date(param.name).setHours(23, 59, 59),
          ],
        })
      );
    });
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.barChart.resize());
    elementResizeDetectorMaker().listenTo(this.bar.nativeElement, () =>
      this.barChart.resize()
    );
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.title.subtext = this.subTitle;
    this.option.series[0].name = this.seriesName[0][0];
    this.option.series[1].name = this.seriesName[0][1];
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.barData.subscribe((res) => {
      this.option.xAxis.data = res.xAxisData;
      this.option.series[0].data = res.seriesData1;
      this.option.series[1].data = res.seriesData2;
      this.barChart.setOption(this.option);
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
      const axisData = opt.xAxis[0].data;
      const series = opt.series;
      let table = `<table style='width:100%;text-align:center;' border='1' cellspacing='0'>
                    <tbody>
                    <tr>
                    <th>${this.seriesName[1]}</th>`;
      series.forEach(val => (table += `<th>${val.name}</th>`));
      table += '</tr>';
      for (let i = 0, l = series[0].data.length; i < l; i++) {
        table += `<tr><td>${axisData[i].replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1年$2月$3日')}</td>`;
        series.forEach((value) => (table += `<td>${value.data[i]}</td>`));
        table += '</tr>';
      }
      table += '</tbody></table>';
      return table;
    };
  }
}
