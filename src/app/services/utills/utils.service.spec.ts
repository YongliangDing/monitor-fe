import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('date should be formatted', () => {
    expect(service.formatDate('2020-1-1')).toBe('2020-01-01');
    expect(service.formatDate(new Date('2020-1-31'))).toBe('2020-01-31');
    expect(service.formatDate(1594964191837)).toBe('2020-07-17')
  });
});
