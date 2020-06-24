import { Component } from '@angular/core';
import { CommunicateService } from 'src/app/services/communicate/communicate.service';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  dateRange = [];
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, new Date()) > 0 || differenceInCalendarDays(current, new Date('2020-06-11')) < 0;
  }
  constructor(private communicate: CommunicateService) { }
  onChange(result: Array<Date>) {
    this.dateRange = result;
    this.communicate.sendMessage(JSON.stringify({
      sender: 'datePicker',
      message: [result[0].setHours(0, 0 , 0), result[1].setHours(23, 59, 59)]
    }));
  }
}
