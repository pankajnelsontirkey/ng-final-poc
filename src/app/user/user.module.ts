import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserDashboardComponent } from "./userDashboard.component";
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { AddEmployeeComponent } from "./list-employees/add-employees/add-employee.component";
import { EditEmployeeComponent } from "./list-employees/edit-employee/edit-employee.component";
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DetailEmployeeComponent
  ],
  imports: [CommonModule]
})
export class UserModule {}
