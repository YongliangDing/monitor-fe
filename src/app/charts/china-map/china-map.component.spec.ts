import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChinaMapComponent } from './china-map.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';

const seriesData = [
  { _id: "广东", total: 1 },
  { _id: "浙江", total: 1 },
  { _id: "台湾", total: 9 }
];

describe('ChinaMapComponent', () => {
  let component: ChinaMapComponent;
  let fixture: ComponentFixture<ChinaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NzSpinModule ],
      declarations: [ ChinaMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinaMapComponent);
    component = fixture.componentInstance;
    component.title = '访问来源统计';
    component.subTitle = '2020-01-01';
    component.mapData = new Observable(subscriber => subscriber.next(seriesData));
    component.seriesName = [['访问量'], '省份'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('map should be drawed', () => {
    const map = component.mapChart;
    const option = map.getOption();
    expect(map.getDom()).toBe(component.map.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    seriesData.forEach(s =>
      expect(option.series[0].data.find(d => d.name === s._id).value).toBe(s.total)
    );
  });

  it('map should be redrawed', () => {
    const seriesData = [
      { _id: "广东", total: 10 },
      { _id: "浙江", total: 100 },
      { _id: "台湾", total: 9 }
    ];
    component.title = '访问来源统计';
    component.subTitle = '2020-12-01';
    component.seriesName = [['访问量'], '省份'];
    component.mapData = new Observable(subscriber => subscriber.next(seriesData));
    component.ngOnChanges();
    fixture.detectChanges();

    const map = component.mapChart;
    const option = map.getOption();
    expect(map.getDom()).toBe(component.map.nativeElement);
    expect(option.title[0].text).toBe(component.title);
    expect(option.title[0].subtext).toBe(component.subTitle);
    expect(option.series[0].name).toBe(component.seriesName[0][0]);
    seriesData.forEach(s =>
      expect(option.series[0].data.find(d => d.name === s._id).value).toBe(s.total)
    );
  });
});
