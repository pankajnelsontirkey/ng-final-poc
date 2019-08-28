import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeesService } from "../../employees.service";
import { EmployeeModel } from "src/app/shared/models";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Params
} from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-detail-employee",
  templateUrl: "./detail-employee.component.html",
  styleUrls: ["./detail-employee.component.scss"]
})
export class DetailEmployeeComponent implements OnInit, OnDestroy {
  employee: EmployeeModel;
  employeeId: string;
  employeeSubscription: Subscription;
  isLoading: boolean = false;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.employeeId = params["id"];
    });
    /* getEmployeeById needs to be called in a routeResolver */
    this.employeesService.getEmployeeById(this.employeeId);

    this.isLoading = true;

    this.employeeSubscription = this.employeesService.selectedEmployeeChanged.subscribe(
      selectedEmployee => {
        this.employee = selectedEmployee;
        this.isLoading = false;
      }
    );
  }

  onClickEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }
}
