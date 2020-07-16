import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';
import { BarComponent } from './bar.component';

const seriesData = {
  xAxisData: ["2020-06-11", "2020-06-12", "2020-06-13", "2020-06-14", "2020-06-15", "2020-06-16", "2020-06-17", "2020-06-18", "2020-06-19", "2020-06-20", "2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27", "2020-06-28", "2020-06-29", "2020-06-30", "2020-07-01", "2020-07-02", "2020-07-03", "2020-07-04", "2020-07-05", "2020-07-06", "2020-07-07", "2020-07-08", "2020-07-09", "2020-07-10", "2020-07-11", "2020-07-12", "2020-07-13", "2020-07-14", "2020-07-15", "2020-07-16"],
  seriesData1: [20, 75, 65, 34, 3, 7, 1, 1, 118, 85, 70, 40, 61, 65, 56, 99, 73, 60, 68, 98, 80, 108, 79, 81, 146, 65, 72, 66, 61, 68, 65, 51, 52, 45, 46, 36],
  seriesData2: [12, 49, 46, 29, 3, 7, 1, 1, 37, 65, 50, 28, 36, 44, 35, 45, 52, 44, 55, 67, 68, 80, 61, 53, 57, 55, 53, 45, 48, 56, 46, 47, 32, 35, 34, 26]
};

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    component.title = '站点日访问量';
    component.subTitle = '2020-01-01至2020-12-31';
    component.seriesName = [['PV', 'UV'], '日期'];
    component.barData = new Observable(subscriber => subscriber.next(seriesData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bar should be drawed', () => {
    const bar = component.barChart;
    const option = bar.getOption();
    expect(bar.getDom()).toBe(component.bar.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[1].name).toBe(component.seriesName[0][1]);
    expect(option.series[0].data).toEqual(seriesData.seriesData1);
    expect(option.series[1].data).toEqual(seriesData.seriesData2);
    expect(option.xAxis[0].data).toEqual(seriesData.xAxisData);
  });

  it('bar should be redrawed', () => {
    const seriesData = {
      xAxisData: ["2020-06-11", "2020-06-12", "2020-06-13", "2020-06-14", "2020-06-15", "2020-06-16", "2020-06-17", "2020-06-18", "2020-06-19", "2020-06-20", "2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27", "2020-06-28", "2020-06-29", "2020-06-30", "2020-07-01", "2020-07-02", "2020-07-03", "2020-07-04", "2020-07-05", "2020-07-06", "2020-07-07", "2020-07-08", "2020-07-09", "2020-07-10", "2020-07-11", "2020-07-12", "2020-07-13"],
      seriesData1: [20, 75, 65, 34, 3, 7, 1, 1, 118, 85, 70, 40, 61, 65, 56, 99, 73, 60, 68, 98, 80, 108, 79, 81, 146, 65, 72, 66, 61, 68, 65, 51, 52],
      seriesData2: [12, 49, 46, 29, 3, 7, 1, 1, 37, 65, 50, 28, 36, 44, 35, 45, 52, 44, 55, 67, 68, 80, 61, 53, 57, 55, 53, 45, 48, 56, 46, 47, 32]
    };
    component.title = '站点日访问量';
    component.subTitle = '2020-01-01至2020-11-30';
    component.seriesName = [['PV', 'UV'], '日期'];
    component.barData = new Observable(subscriber => subscriber.next(seriesData));
    component.ngOnChanges();
    fixture.detectChanges();

    const bar = component.barChart;
    const option = bar.getOption();
    expect(bar.getDom()).toBe(component.bar.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[1].name).toBe(component.seriesName[0][1]);
    expect(option.series[0].data).toEqual(seriesData.seriesData1);
    expect(option.series[1].data).toEqual(seriesData.seriesData2);
    expect(option.xAxis[0].data).toEqual(seriesData.xAxisData);
  });
});
