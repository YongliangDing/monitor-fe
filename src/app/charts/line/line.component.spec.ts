import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LineComponent } from './line.component';
import { NzSpinModule } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

const seriesData = {
  seriesData1: [3, 1, 2, 1, 6, 3, 2, 4, 4, 6, 5, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  xAxisData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
};

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ LineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    component.title = '每小时访问量';
    component.subTitle = '2020-07-01';
    component.lineData = new Observable(subscriber => subscriber.next(seriesData));
    component.seriesName = [['访问量'], '时间'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('line should be drawed', () => {
    const line = component.lineChart;
    const option = line.getOption();
    expect(line.getDom()).toBe(component.line.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[0].data).toEqual(seriesData.seriesData1);
    expect(option.xAxis[0].data).toEqual(seriesData.xAxisData);
  });

  it('line should be redrawed', () => {
    const seriesData = {
      seriesData1: [13, 1, 2, 1, 6, 3, 12, 4, 4, 6, 15, 2, 1, 2, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      xAxisData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    };
    component.title = '每小时访问量';
    component.subTitle = '2020-07-02';
    component.seriesName = [['访问量'], '时间'];
    component.lineData = new Observable(subscriber => {
      subscriber.next(seriesData);
    });
    component.ngOnChanges();
    fixture.detectChanges();

    const line = component.lineChart;
    const option = line.getOption();
    expect(line.getDom()).toBe(component.line.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[0].data).toEqual(seriesData.seriesData1);
    expect(option.xAxis[0].data).toEqual(seriesData.xAxisData);
  });
});
