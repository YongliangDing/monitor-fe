import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const proxyAPI = '/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  getChartsData(url: string, option = {}): Observable<any> {
    return this.http.get<any>(proxyAPI + url, option);
  }
}
