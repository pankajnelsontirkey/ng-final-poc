import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/shared/models';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees: EmployeeModel[] = [];
  constructor() {}

  ngOnInit() {}
}
