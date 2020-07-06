import { Component } from '@angular/core';
import { ILogForm } from 'src/app/interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  
  formData = null;

  constructor() { }

  onSubmit(form: ILogForm) {
    this.formData = form;
  }
}
