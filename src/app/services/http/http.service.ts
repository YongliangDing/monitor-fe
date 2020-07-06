import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const proxyAPI = '/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  getData(url: string, option = {}): Observable<any> {
    return this.http.get(proxyAPI + url, option);
  }
  postData(url: string, data: any, option = {}): Observable<any> {
    return this.http.post(proxyAPI + url, data, option);
  }
}
