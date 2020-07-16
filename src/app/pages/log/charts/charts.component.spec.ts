import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/services/http/http.service';
import { ChartsComponent } from './charts.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ChartsComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
