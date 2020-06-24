import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IEchartsNestedPiesData } from 'src/app/interface';
import { echarts } from '../macarons.theme';
import getOption from './echarts.option';
import elementResizeDetectorMaker from 'element-resize-detector';
import { Table2ExcelService } from 'src/app/services/table2excel/table2excel.service';

@Component({
  selector: 'app-nested-pies',
  templateUrl: './nested-pies.component.html',
  styleUrls: ['./nested-pies.component.css'],
})
export class NestedPiesComponent implements OnInit, OnChanges {
  @ViewChild('nestedPies', { static: true }) pies: ElementRef;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() piesData: Observable<IEchartsNestedPiesData> = null;
  @Input() seriesName: [string[], string];
  isSpinning = false;
  piesChart = null;
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
    this.piesChart = echarts.init(this.pies.nativeElement, 'macarons');
    this.setStaticOption();
    this.initDataView();
    this.setDynamicOption();
  }

  addResizeDetector(): void {
    window.addEventListener('resize', () => this.piesChart.resize());
    elementResizeDetectorMaker().listenTo(this.pies.nativeElement, () =>
      this.piesChart.resize()
    );
  }

  setStaticOption() {
    this.option.title.text = this.title;
    this.option.title.subtext = this.subTitle;
    this.option.series[0].name = this.option.series[1].name = this.seriesName[0][0];
  }

  setDynamicOption(): void {
    this.isSpinning = true;
    this.piesData.subscribe((res) => {
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      res.countByVersion.forEach((o) => {
        const osName = o._id ? `${o._id.name} ${o._id.version || ''}` : '';
        this.option.series[1].data.push({ value: o.total, name: osName });
      });
      res.countByName.forEach((o) => {
        this.option.series[0].data.push({ value: o.total, name: o._id });
      });
      this.piesChart.setOption(this.option);
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
      let table = `<table style='width:100%;text-align:center;' border='1' cellspacing='0'>
                    <tbody>
                    <tr>
                    <th>${this.seriesName[1]}</th><th>${opt.series[0].name}</th>`;
      // opt.series.forEach(val => (table += `<th>${val.name}</th>`));
      table += '</tr>';
      opt.series[0].data.forEach(s0 => {
        opt.series[1].data.forEach(s1 => {
          if (s1.name.includes(s0.name)) {
            table += `<tr><td>${s1.name}</td><td>${s1.value}</td></tr>`;
          }
        });
        table += `<tr style="background: #eee;"><td>${s0.name}</td><td>${s0.value}</td></tr>`;
      });
      table += '</tbody></table>';
      return table;
    };
  }
}
