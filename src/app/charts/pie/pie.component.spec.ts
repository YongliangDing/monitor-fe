import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PieComponent } from './pie.component';
import { NzSpinModule } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

const res = {
  legendData: ["200", "400", "404", "405"],
  seriesData: [{ value: 18, name: "200" }, { value: 17, name: "400" }, { value: 5, name: "404" }, { value: 2, name: "405" }]
};

describe('PieComponent', () => {
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ PieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    component.title = '响应状态统计';
    component.subTitle = '2020-01-01';
    component.pieData = new Observable(subscriber => subscriber.next(res));
    component.seriesName = [['访问量'], '响应状态'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pie should be drawed', () => {
    const pie = component.pieChart;
    const option = pie.getOption();
    expect(pie.getDom()).toBe(component.pie.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.legend[0].data).toEqual(res.legendData);
    expect(option.series[0].data).toEqual(res.seriesData);
  });

  it('pie should be redrawed', () => {
    const res = {
      legendData: ["400", "404", "405"],
      seriesData: [{ value: 17, name: "400" }, { value: 5, name: "404" }, { value: 2, name: "405" }]
    };
    component.title = '响应状态统计';
    component.subTitle = '2020-11-01';
    component.pieData = new Observable(subscriber => subscriber.next(res));
    component.seriesName = [['访问量'], '响应状态'];
    component.ngOnChanges();
    fixture.detectChanges();

    const pie = component.pieChart;
    const option = pie.getOption();
    expect(pie.getDom()).toBe(component.pie.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.legend[0].data).toEqual(res.legendData);
    expect(option.series[0].data).toEqual(res.seriesData);
  });
});
