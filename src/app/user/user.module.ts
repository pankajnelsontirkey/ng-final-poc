import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { UserDashboardComponent } from "./userDashboard.component";
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { AddEmployeeComponent } from "./list-employees/add-employees/add-employee.component";
import { EditEmployeeComponent } from "./list-employees/edit-employee/edit-employee.component";
import { DetailEmployeeComponent } from "./detail-employee/detail-employee.component";
import { UserRoutingModule } from "./user-routing.module";
import { EmployeesService } from "./employees.service";
import { SummaryComponent } from "./summary/summary.component";

@NgModule({
  declarations: [
    UserDashboardComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DetailEmployeeComponent,
    SummaryComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, UserRoutingModule],
  providers: [EmployeesService],
  bootstrap: [UserDashboardComponent]
})
export class UserModule {}
