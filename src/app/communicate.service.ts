import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommunicateService {

  private _sendMessage: ReplaySubject<any> = new ReplaySubject<any>(1);
  public sendMessage(message: string) {
    this._sendMessage.next(message);
  }
  public getMessage(): Observable<any> {
    return this._sendMessage.asObservable();
  }
}
