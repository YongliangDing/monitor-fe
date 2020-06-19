import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http.service';
import { IEchartsCommonData, IEchartsPieData, IEchartsNestedPiesData, IAggregateResult } from '../../interface';
import { CommunicateService } from 'src/app/communicate.service';
import io from 'socket.io-client';

const today = new Date();
let datesCmpStartDate = new Date('2020-6-11').setHours(0, 0, 0);
let datesCmpEndDate = today.setHours(23, 59, 59);
let otherCmpStartDate = today.setHours(0, 0, 0);
let otherCmpEndDate = today.setHours(23, 59, 59);

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
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
  constructor(private http: HttpService, private communicate: CommunicateService) { }

  ngOnInit() {
    const socket = io('http://istintin.xyz:3000');
    socket.on('connect', () => {
      console.log('Connected');
    });

    this.setOtherData();
    this.setDatesData();
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
    this.datesData = this.http.getChartsData('/count/date', {
      params
    });
    this.datesSubTitle = (startDate && endDate) ?
      `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
      `2020-06-11至${today.toLocaleDateString().replace(/\//g, '-')}`;
  }

  setHoursData(startDate: number, endDate: number) {
    this.hoursSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.hoursData = this.http.getChartsData(
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
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.stateData = this.http.getChartsData(
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
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.uaOSData = this.http.getChartsData('/count/os', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setBrowserData(startDate: number, endDate: number) {
    this.uaBrowserSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.uaBrowserData = this.http.getChartsData(
      '/count/browser', {
        params: {
          startDate, endDate
        }
    }
    );
  }

  setMapData(startDate: number, endDate: number) {
    this.mapSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.mapData = this.http.getChartsData('/count/map', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setUserData(startDate: number, endDate: number) {
    this.userSubTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.userData = this.http.getChartsData(
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
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.sourcePageData = this.http.getChartsData(
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
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}`;
    this.requestPathData = this.http.getChartsData(
      'ranking/request-path', {
        params: {
          startDate,
          endDate
        }
    }
    );
  }
}


