import { TestBed } from '@angular/core/testing';

import { Table2ExcelService } from './table2excel.service';

describe('ExportTableService', () => {
  let service: Table2ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Table2ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
