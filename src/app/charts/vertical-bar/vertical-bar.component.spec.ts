import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerticalBarComponent } from './vertical-bar.component';
import { NzSpinModule } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

const res = {
  seriesData1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 5],
  xAxisData: [
    "93.174.93.139",
    "113.107.138.120",
    "183.136.225.57",
    "71.6.232.9",
    "83.97.20.31",
    "37.49.224.125",
    "91.109.199.47",
    "5.188.210.101",
    "34.94.136.23",
    "201.150.52.33",
    "220.133.226.136",
    "193.118.53.210",
    "193.192.176.142",
    "114.34.178.217",
    "93.142.70.217",
    "104.244.78.107",
    "192.241.234.43",
    "110.232.94.212",
    "80.82.70.187",
    "42.240.133.87",
    "114.34.25.217",
    "181.48.164.98",
    "103.21.205.150",
    "122.117.118.87",
    "1.168.15.155",
    "175.183.8.125",
    "54.218.113.216",
    "143.92.32.86",
    "192.35.168.212",
    "75.74.21.46",
    "59.126.153.228",
    "104.152.52.2",
  ]
};

describe('VerticalBarComponent', () => {
  let component: VerticalBarComponent;
  let fixture: ComponentFixture<VerticalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ VerticalBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBarComponent);
    component = fixture.componentInstance;
    component.title = '用户访问排行';
    component.subTitle = '2020-01-31';
    component.barData = new Observable(subscriber => subscriber.next(res))
    component.seriesName = [['访问量'], 'IP'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('vertical bar should be drawed', () => {
    const bar = component.barChart;
    const option = bar.getOption();
    expect(bar.getDom()).toBe(component.bar.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.yAxis[0].data).toEqual(res.xAxisData);
    expect(option.series[0].data).toEqual(res.seriesData1);
  });

  it('vertical bar should be redrawed', () => {
    const res = {
      seriesData1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 5],
      xAxisData: [
        "93.174.93.139",
        "113.107.138.120",
        "183.136.225.57",
        "71.6.232.9",
        "83.97.20.31",
        "37.49.224.125",
        "91.109.199.47",
        "5.188.210.101",
        "34.94.136.23",
        "201.150.52.33",
        "220.133.226.136",
        "193.118.53.210",
        "193.192.176.142",
        "114.34.178.217",
        "93.142.70.217",
        "104.244.78.107",
        "192.241.234.43",
        "110.232.94.212",
        "80.82.70.187",
        "42.240.133.87",
        "114.34.25.217",
        "181.48.164.98",
        "103.21.205.150",
        "122.117.118.87",
        "1.168.15.155",
        "175.183.8.125",
        "54.218.113.216",
        "143.92.32.86",
        "192.35.168.212",
        "75.74.21.46",
        "59.126.153.228",
        "104.152.52.2",
      ]
    };
    component.title = '用户访问排行';
    component.subTitle = '2020-12-31';
    component.barData = new Observable(subscriber => subscriber.next(res))
    component.seriesName = [['访问量'], 'IP'];
    component.ngOnChanges();
    fixture.detectChanges();

    const bar = component.barChart;
    const option = bar.getOption();
    expect(bar.getDom()).toBe(component.bar.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.yAxis[0].data).toEqual(res.xAxisData);
    expect(option.series[0].data).toEqual(res.seriesData1);
  });
});
