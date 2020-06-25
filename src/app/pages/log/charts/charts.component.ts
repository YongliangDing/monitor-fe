import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { IEchartsCommonData, IEchartsPieData, IEchartsNestedPiesData, IAggregateResult } from '../../../interface';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import io from 'socket.io-client';
import { UtilsService } from 'src/app/services/utills/utils.service';

const today = new Date();
let datesCmpStartDate = new Date('2020-6-11').setHours(0, 0, 0);
let datesCmpEndDate = today.setHours(23, 59, 59);
let otherCmpStartDate = today.setHours(0, 0, 0);
let otherCmpEndDate = today.setHours(23, 59, 59);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  datesTitle = '站点日访问量';
  datesSubTitle = '';
  hoursTitle = '每小时访问量';
  hoursSubTitle = '';
  stateTitle = '响应状态统计';
  stateSubTitle = '';
  uaOSTitle = '访问操作系统统计';
  uaOSSubTitle = '';
  uaBrowserTitle = '访问浏览器统计';
  uaBrowserSubTitle = '';
  mapTitle = '访问来源统计';
  mapSubTitle = '';
  userTitle = '用户访问排行';
  userSubTitle = '';
  sourcePageTitle = '来源页排行';
  sourcePageSubTitle = '';
  requestPathTitle = '请求路径排行';
  requestPathSubTitle = '';
  datesData: Observable<IEchartsCommonData> = null;
  hoursData: Observable<IEchartsCommonData> = null;
  stateData: Observable<IEchartsPieData> = null;
  uaOSData: Observable<IEchartsNestedPiesData> = null;
  uaBrowserData: Observable<IEchartsNestedPiesData> = null;
  mapData: Observable<IAggregateResult> = null;
  userData: Observable<IEchartsCommonData> = null;
  sourcePageData: Observable<IEchartsCommonData> = null;
  requestPathData: Observable<IEchartsCommonData> = null;

  constructor(
    private http: HttpService,
    private communicate: CommunicateService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.addSocketListener();
    this.addMessageListener();
    this.setOtherData();
    this.setDatesData();
  }

  addSocketListener() {
    const socket = io('http://istintin.xyz:3000');
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('update-log', () => {
      const now = Date.now();
      if (now >= datesCmpStartDate && now <= datesCmpEndDate) {
        this.setDatesData(datesCmpStartDate, datesCmpEndDate);
      }

      if (now >= otherCmpStartDate && now <= otherCmpEndDate) {
        this.setOtherData(otherCmpStartDate, otherCmpEndDate);
      }
    });
  }

  addMessageListener() {
    this.communicate.getMessage().subscribe(m => {
      const mesObj = JSON.parse(m);
      if (mesObj.sender === 'datePicker') {
        this.setOtherData(mesObj.message[0], mesObj.message[1]);
        this.setDatesData(mesObj.message[0], mesObj.message[1]);
        datesCmpStartDate = mesObj.message[0];
        datesCmpEndDate = mesObj.message[1];
      } else if (mesObj.sender === 'barCmpt') {
        this.setOtherData(mesObj.message[0], mesObj.message[1]);
        otherCmpStartDate = mesObj.message[0];
        otherCmpEndDate = mesObj.message[1];
      }
    });
  }

  setOtherData(startDate: number = today.setHours(0, 0, 0), endDate: number = today.setHours(23, 59, 59)) {
    this.setHoursData(startDate, endDate);
    this.setStateData(startDate, endDate);
    this.setUaOSData(startDate, endDate);
    this.setBrowserData(startDate, endDate);
    this.setMapData(startDate, endDate);
    this.setUserData(startDate, endDate);
    this.setSourcePageData(startDate, endDate);
    this.setRequestPathData(startDate, endDate);
  }

  setDatesData(startDate?: number, endDate?: number) {
    const params = (startDate && endDate) ? {
      startDate,
      endDate
    } : {};
    this.datesData = this.http.getData('/count/date', {
      params
    });
    this.datesSubTitle = (startDate && endDate) ?
      `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
      `2020-06-11至${today.toLocaleDateString().replace(/\//g, '-')}`;
  }

  setHoursData(startDate: number, endDate: number) {
    this.hoursSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.hoursData = this.http.getData(
      '/count/hour', {
      params: {
        startDate,
        endDate
      }
    }
    );
  }

  setStateData(startDate: number, endDate: number) {
    this.stateSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.stateData = this.http.getData(
      '/count/state', {
      params: {
        startDate,
        endDate
      }
    }
    );
  }

  setUaOSData(startDate: number, endDate: number) {
    this.uaOSSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    // tslint:disable-next-line:max-line-length
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.uaOSData = this.http.getData('/count/os', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setBrowserData(startDate: number, endDate: number) {
    this.uaBrowserSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.uaBrowserData = this.http.getData(
      '/count/browser', {
        params: {
          startDate, endDate
        }
    }
    );
  }

  setMapData(startDate: number, endDate: number) {
    this.mapSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.mapData = this.http.getData('/count/map', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setUserData(startDate: number, endDate: number) {
    this.userSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.userData = this.http.getData(
      '/ranking/user', {
        params: {
          startDate,
          endDate
        }
    }
    );
  }

  setSourcePageData(startDate: number, endDate: number) {
    this.sourcePageSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.sourcePageData = this.http.getData(
      '/ranking/source-page', {
        params: {
          startDate,
          endDate
        }
    }
    );
  }

  setRequestPathData(startDate: number, endDate: number) {
    this.requestPathSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${this.utils.formatDate(startDate)}至${this.utils.formatDate(endDate)}` :
    `${this.utils.formatDate(startDate)}`;
    this.requestPathData = this.http.getData(
      'ranking/request-path', {
        params: {
          startDate,
          endDate
        }
    }
    );
  }
}


