import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatDate(date: number | string | Date): string {
    const d: Date = date instanceof Date ? date
    : new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return [year, month, day].map(x => this.formatNumber(x)).join('-');
  }

  formatNumber(str: number): string {
    return str > 9 ? str.toString() : '0' + str;
  }
}
