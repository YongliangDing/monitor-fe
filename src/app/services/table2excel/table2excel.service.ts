import { Injectable } from '@angular/core';

let table2excel;

if (window.Table2Excel) {
  table2excel = new window.Table2Excel();
}


@Injectable({
  providedIn: 'root',
})
export class Table2ExcelService {
  /**
   * table转化为excel
   */
  exportExcel(table: HTMLTableElement, title: string) {
    table2excel.export(table, title);
  }
}
