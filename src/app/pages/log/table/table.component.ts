import { HttpService } from 'src/app/services/http/http.service';
import { NzTableComponent } from 'ng-zorro-antd';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/services/utills/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class TableComponent implements OnInit {
  dataSet: IAccess[] = [];
  @ViewChild('borderedTable', { static: true }) borderedTable: NzTableComponent;
  length: number;
  caption = `数据访问详情`;
  startDate = new Date('2020-06-11').setHours(23, 59, 59);
  endDate = new Date().setHours(23, 59, 59);
  pageSize = 10;
  validateForm!: FormGroup;

  constructor(
    private http: HttpService,
    private communicate: CommunicateService,
    private utils: UtilsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    this.setPageData();
    this.addMessageListener();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  addMessageListener() {
    this.communicate.getMessage().subscribe((m) => {
      const mesObj = JSON.parse(m);
      if (mesObj.sender === 'datePicker') {
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
    this.http
      .getData('/detail', {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
          pageIndex: this.borderedTable.nzPageIndex,
          size: this.borderedTable.nzPageSize,
        },
      })
      .subscribe((res) => {
        this.dataSet = res.onePage;
        this.length = res.length;
        console.log(this.dataSet);
      });
  }

  changeSize() {
    this.borderedTable.nzPageIndex = 1;
    this.setPageData();
  }

  getTime(str: string): string {
    return this.utils.formatDate(str);
  }

  trackById(index: string, onePage: any): string {
    return onePage._id;
  }
}
