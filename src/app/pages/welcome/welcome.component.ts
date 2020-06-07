import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http.service';
import { IEchartsCommonData, IEchartsPieData, IEchartsNestedPiesData, IAggregateResult } from '../../interface';
import { CommunicateService } from 'src/app/communicate.service';

const today = new Date();

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  datesTitle = '站点日访问量';
  hoursTitle = '';
  stateTitle = '';
  uaOSTitle = '';
  uaBrowserTitle = '';
  mapTitle = '';
  userTitle = '';
  sourcePageTitle = '';
  requestPathTitle = '';
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
    this.setData();
    this.setDatesData();
    this.communicate.getMessage().subscribe(m => {
      const mesObj = JSON.parse(m);
      if (mesObj.sender === 'datePicker') {
        this.setData(mesObj.message[0], mesObj.message[1]);
        this.setDatesData(mesObj.message[0], mesObj.message[1]);
      } else if (mesObj.sender === 'barCmpt') {
        this.setData(mesObj.message[0], mesObj.message[1]);
      }
    });
  }

  setData(startDate: number = today.setHours(0, 0, 0), endDate: number = today.setHours(23, 59, 59)) {
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
  }

  setHoursData(startDate: number, endDate: number) {
    this.hoursTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}每小时访问量` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}每小时访问量`;
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
    this.stateTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}响应状态统计` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}响应状态统计`;
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
    this.uaOSTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    // tslint:disable-next-line:max-line-length
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}访问操作系统统计` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}访问操作系统统计`;
    this.uaOSData = this.http.getChartsData('/count/os', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setBrowserData(startDate: number, endDate: number) {
    this.uaBrowserTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}访问浏览器统计` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}访问浏览器统计`;
    this.uaBrowserData = this.http.getChartsData(
      '/count/browser', {
        params: {
          startDate, endDate
        }
    }
    );
  }

  setMapData(startDate: number, endDate: number) {
    this.mapTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}访问来源统计` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}访问来源统计`;
    this.mapData = this.http.getChartsData('/count/map', {
      params: {
        startDate,
        endDate
      }
    });
  }

  setUserData(startDate: number, endDate: number) {
    this.userTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}用户访问排行` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}用户访问排行`;
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
    this.sourcePageTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}来源页排行` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}来源页排行`;
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
    this.requestPathTitle = endDate - startDate > 24 * 60 * 60 * 1000 ?
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}至${new Date(endDate).toLocaleDateString().replace(/\//g, '-')}请求路径排行` :
    `${new Date(startDate).toLocaleDateString().replace(/\//g, '-')}请求路径排行`;
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


