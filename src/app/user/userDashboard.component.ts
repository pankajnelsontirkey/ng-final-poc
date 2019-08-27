import { Component, OnInit } from "@angular/core";

import { EmployeeModel } from "../shared/models";
import { EmployeesService } from "./employees.service";

@Component({
  selector: "app-hr",
  templateUrl: "./userDashboard.component.html",
  styleUrls: ["./userDashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {
  employees: { first: EmployeeModel[]; recent: EmployeeModel[] } = {
    first: [],
    recent: []
  };

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService.fetchEmployees();

    this.employeesService.employeesChanged.subscribe(employees => {
      if (employees) {
        this.employees["first"] = employees.slice(0, 5);
        this.employees["recent"] = employees.slice(-1, 5);
        /* .sort((a, b) => {
          if (a > b) {
            return a;
          } else {
            return b;
          }
          }
        */
      }
    });
  }
}
