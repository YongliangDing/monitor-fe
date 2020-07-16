import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  countUpOption = {
    separator: ',',
    useEasing: true,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
