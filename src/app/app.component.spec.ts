import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NzDatePickerModule, NzSliderModule, NzLayoutModule, NzIconModule, NzMenuModule, NzToolTipModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzDatePickerModule,
        NzSliderModule,
        NzLayoutModule,
        NzIconModule,
        NzMenuModule,
        NzToolTipModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
