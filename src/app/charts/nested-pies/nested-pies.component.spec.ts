import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedPiesComponent } from './nested-pies.component';
import { NzSpinModule } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

const seriesData = {
  countByName: [
    { _id: null, total: 28 },
    { _id: "Linux", total: 2 },
    { _id: "Windows", total: 10 },
    { _id: "macOS", total: 2 },
  ],
  countByVersion: [
    { _id: {}, total: 28 },
    { _id: { name: "Linux" }, total: 2 },
    { _id: { name: "Windows", version: "NT 10.0" }, total: 8 },
    { _id: { name: "Windows", version: "NT 6.1" }, total: 2 },
    { _id: { name: "macOS", version: "10.11" }, total: 1 },
    { _id: { name: "macOS", version: "10.11.6" }, total: 1 },
  ]
};

describe('NestedPiesComponent', () => {
  let component: NestedPiesComponent;
  let fixture: ComponentFixture<NestedPiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ NestedPiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedPiesComponent);
    component = fixture.componentInstance;
    component.title = '访问操作系统统计';
    component.subTitle = '2020-01-01';
    component.piesData = new Observable(subscriber => subscriber.next(seriesData));
    component.seriesName = [['访问量'], '操作系统'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nested pies should be drawed', () => {
    const pies = component.piesChart;
    const option = pies.getOption();
    const s1 = seriesData.countByName.map(o => ({
      value: o.total,
      name: o._id
    }));
    const s2 = seriesData.countByVersion.map(o => ({
      value: o.total,
      name: o._id ? `${o._id.name} ${o._id.version || ''}` : ''
    }));
    expect(pies.getDom()).toBe(component.pies.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[1].name).toBe(component.seriesName[0][0]);
    expect(option.series[0].data).toEqual(s1);
    expect(option.series[1].data).toEqual(s2);
  });

  it('nested pies should be redrawed', () => {
    const seriesData = {
      countByName: [
        { _id: "Linux", total: 2 },
        { _id: "Windows", total: 10 },
        { _id: "macOS", total: 2 },
      ],
      countByVersion: [
        { _id: { name: "Linux" }, total: 2 },
        { _id: { name: "Windows", version: "NT 10.0" }, total: 8 },
        { _id: { name: "Windows", version: "NT 6.1" }, total: 2 },
        { _id: { name: "macOS", version: "10.11" }, total: 1 },
        { _id: { name: "macOS", version: "10.11.6" }, total: 1 },
      ]
    };
    const s1 = seriesData.countByName.map(o => ({
      value: o.total,
      name: o._id
    }));
    const s2 = seriesData.countByVersion.map(o => ({
      value: o.total,
      name: o._id ? `${o._id.name} ${o._id.version || ''}` : ''
    }));
    component.title = '访问操作系统统计';
    component.subTitle = '2020-12-31';
    component.seriesName = [['访问量'], '操作系统'];
    component.piesData = new Observable(subscriber => {
      subscriber.next(seriesData);
    });
    component.ngOnChanges();
    fixture.detectChanges();

    const pies = component.piesChart;
    const option = pies.getOption();
    expect(pies.getDom()).toBe(component.pies.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    expect(option.series[1].name).toBe(component.seriesName[0][0]);
    expect(option.series[0].data).toEqual(s1);
    expect(option.series[1].data).toEqual(s2);
  });
});
