import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Observable } from 'rxjs';
import { ICountObj, ICountDateObj } from '../../interface';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  datesTitle = '站点日访问量';
  hoursTitle = '每小时访问量';
  stateTitle = '响应状态统计';
  datesData: Observable<ICountDateObj> = null;
  hoursData: Observable<ICountObj[]> = null;
  stateData: Observable<ICountObj[]> = null;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.setDatesData();
    this.setHoursData();
    this.setStateData();
  }

  setDatesData() {
    this.datesData = this.http.getChartsData('/count/date');
  }

  setHoursData() {
    this.hoursData = this.http.getChartsData('/count/hour?startDate=2020-05-29');
  }

  setStateData() {
    this.stateData = this.http.getChartsData('/count/state?startDate=2020-05-29');
  }
}


