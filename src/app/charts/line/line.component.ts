import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import getOption from './echarts.option';
import { Observable } from 'rxjs';
import { IEchartsCommonData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import elementResizeDetectorMaker from 'element-resize-detector';
import { Table2ExcelService } from 'src/app/services/table2excel/table2excel.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit, OnChanges {
  @ViewChild('line', { static: true }) line: ElementRef;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() lineData: Observable<IEchartsCommonData> = null;
  @Input() seriesName: [string[], string];
  isSpinning = false;
  lineChart = null;
  option = getOption();

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
    this.lineChart = echarts.init(this.line.nativeElement, 'macarons');
    this.setStaticOption();
    this.setDynamicOption()
    this.initDataView();;
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.lineChart.resize());
    elementResizeDetectorMaker().listenTo(this.line.nativeElement, () =>
      this.lineChart.resize()
    );
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.title.subtext = this.subTitle;
    this.option.series[0].name = this.seriesName[0][0];
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.lineData.subscribe(res => {
      this.option.xAxis.data = res.xAxisData;
      res.seriesData.forEach((element, index) => this.option.series[index].data = element);
      this.lineChart.setOption(this.option);
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
        table += `<tr><td>${axisData[i]}</td>`;
        series.forEach(value => (table += `<td>${value.data[i]}</td>`));
        table += '</tr>';
      }
      table += '</tbody></table>';
      return table;
    };
  }
}
