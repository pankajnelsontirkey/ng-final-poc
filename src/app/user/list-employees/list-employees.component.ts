import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeModel } from "src/app/shared/models";
import { EmployeesService } from "../employees.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.scss"]
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  employees: EmployeeModel[] = [];
  employeesSubscription: Subscription;
  searchString: string = "";

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesSubscription = this.employeesService.employeesChanged.subscribe(
      employees => {
        this.employees = employees;
      }
    );
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }
}
