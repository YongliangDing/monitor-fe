import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = '站点日访问量';
  barData: Observable<any> = null;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.setBarData();
  }

  setBarData() {
    this.barData = this.http.getChartsData('/count/date');
  }
}


