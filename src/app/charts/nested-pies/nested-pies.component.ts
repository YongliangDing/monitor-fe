import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import echarts from 'echarts';
import { Observable } from 'rxjs';
import { INestedPies } from 'src/app/interface';
import macaronsTheme from '../macarons.theme';
import getOption from './echarts.option';

@Component({
  selector: "app-nested-pies",
  templateUrl: "./nested-pies.component.html",
  styleUrls: ["./nested-pies.component.css"],
})
export class NestedPiesComponent implements OnInit {
  @ViewChild("nested-pies", { static: true }) pies: ElementRef;
  @Input() title: string;
  @Input() piesData: Observable<INestedPies>;
  piesChart = null;
  option = getOption();

  constructor() {}

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    echarts.registerTheme("macarons", macaronsTheme);
    this.piesChart = echarts.init(this.pies.nativeElement, "macarons");
    this.setStaticOption();
    this.setDynamicOption();
  }

  setStaticOption() {
    this.option.title.text = this.title;
  }

  setDynamicOption(): void {
    this.piesData.subscribe(res => {
      this.option.series[0].data = res.innerData;
      this.option.series[1].data = res.outerData;
    });
  }
}
