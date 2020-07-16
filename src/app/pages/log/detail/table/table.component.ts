import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd';
import { ILogForm } from 'src/app/interface';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilsService } from 'src/app/services/utills/utils.service';

interface IAccess {
  _id: string;
  ipAddress: string;
  accessTime: Date;
  requestMethod: string;
  requestPath: string;
  protocol: string;
  requestState: string;
  pageSize: string;
  sourcePage: string;
  userAgent: object;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  dataSet: IAccess[] = [];
  @Input() formData: ILogForm;
  @ViewChild('borderedTable', { static: true }) borderedTable: NzTableComponent;
  length: number;
  caption = `数据访问详情`;
  startDate = new Date('2020-06-11').setHours(23, 59, 59);
  endDate = new Date().setHours(23, 59, 59);
  pageSize = 10;
  isSpinning = false;

  constructor(
    private http: HttpService,
    private communicate: CommunicateService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.setPageData();
    this.addMessageListener();
  }

  ngOnChanges() {
    this.setPageData();
  }

  addMessageListener() {
    this.communicate.getMessage().subscribe((m) => {
      const mesObj = JSON.parse(m);
      if (mesObj.sender === 'datePicker' && !!mesObj.message) {
        this.startDate = mesObj.message[0];
        this.endDate = mesObj.message[1];
        this.setPageData();
      }
    });
  }

  setPageData() {
    this.caption =
      this.startDate === this.endDate
        ? `${this.utils.formatDate(this.startDate)}数据访问详情`
        : `${this.utils.formatDate(this.startDate)}至${this.utils.formatDate(
            this.endDate
        )}数据访问详情`;
    this.isSpinning = true;
    this.http
      .postData('/detail', {
          startDate: this.startDate,
          endDate: this.endDate,
          pageIndex: this.borderedTable.nzPageIndex,
          size: this.borderedTable.nzPageSize,
          formData: this.formData,
      })
      .subscribe((res) => {
        this.dataSet = res.onePage;
        this.length = res.length;
        this.isSpinning = false;
      });
  }

  changeSize() {
    this.borderedTable.nzPageIndex = 1;
    this.setPageData();
  }

  getDate(str: string): string {
    return this.utils.formatDate(str);
  }

  getTime(t: string | number): string {
    return (new Date(t)).toLocaleTimeString();
  }

  trackById(index: string, onePage: any): string {
    return onePage._id;
  }
}
