import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserDashboardComponent } from "./userDashboard.component";
import { AuthGuard } from "../auth/auth.guard";
import { UserGuard } from "./user.guard";
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { AddEmployeeComponent } from "./list-employees/add-employees/add-employee.component";
import { EditEmployeeComponent } from "./list-employees/edit-employee/edit-employee.component";
import { DetailEmployeeComponent } from "./detail-employee/detail-employee.component";
import { SummaryComponent } from "./summary/summary.component";

const UserRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: UserDashboardComponent
    // canActivate: [UserGuard]
  },
  { path: "employees", component: ListEmployeesComponent },
  { path: "employees/add", component: AddEmployeeComponent },
  { path: "employees/:id", component: DetailEmployeeComponent },
  { path: "employees/:id/edit", component: EditEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
