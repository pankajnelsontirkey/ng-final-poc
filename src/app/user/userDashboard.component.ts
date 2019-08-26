import { Component, OnInit } from "@angular/core";

import { EmployeeModel } from "../shared/models";
import { EmployeesService } from "./employees.service";

@Component({
  selector: "app-hr",
  templateUrl: "./userDashboard.component.html",
  styleUrls: ["./userDashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {
  employees: { first: EmployeeModel[]; recent: EmployeeModel };

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    // this.employeesService.getEmployees();
  }
}
