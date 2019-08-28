import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeModel } from "src/app/shared/models";
import { EmployeesService } from "../employees.service";
import { Subscription } from "rxjs";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from "@angular/router";

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.scss"]
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  employees: EmployeeModel[] = [];
  employeesSubscription: Subscription;
  searchString: string = "";

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employeesSubscription = this.employeesService.employeesChanged.subscribe(
      employees => {
        this.employees = employees;
      }
    );
  }

  onSelectEmployee(employeeIndex: number) {
    this.router.navigate([this.employees[employeeIndex]["_id"]], {
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }
}
