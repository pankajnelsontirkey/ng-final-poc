import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from 'src/app/shared/models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() firstFiveEmployees: EmployeeModel[];
  @Input() recentFiveEmployees: EmployeeModel[];

  constructor() {}

  ngOnInit() {}
}
