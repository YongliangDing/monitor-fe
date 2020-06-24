import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import echarts from 'echarts';
import { Observable } from 'rxjs';
import { IEchartsPieData } from 'src/app/interface';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';
import { Table2ExcelService } from 'src/app/services/table2excel/table2excel.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit, OnChanges {
  @ViewChild('pie', { static: true }) pie: ElementRef;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() pieData: Observable<IEchartsPieData> = null;
  @Input() seriesName: [string[], string];
  isSpinning = false;
  pieChart = null;
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
    this.pieChart = echarts.init(this.pie.nativeElement, 'macarons');
    this.setStaticOption();
    this.initDataView();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.pieChart.resize());
    elementResizeDetectorMaker().listenTo(this.pie.nativeElement, () =>
      this.pieChart.resize()
    );
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.title.subtext = this.subTitle;
    this.option.series[0].name = this.seriesName[0][0];
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.pieData.subscribe((res) => {
      this.option.legend.data = res.legendData;
      this.option.series[0].data = res.seriesData;
      this.pieChart.setOption(this.option);
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
      table += '</tbody></table>';
      return table;
    };
  }
}
