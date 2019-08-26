import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserDashboardComponent } from "./userDashboard.component";
import { AuthGuard } from "../auth/auth.guard";
import { UserGuard } from "./user.guard";
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { AddEmployeeComponent } from "./list-employees/add-employees/add-employee.component";
import { EditEmployeeComponent } from "./list-employees/edit-employee/edit-employee.component";
import { DetailEmployeeComponent } from "./detail-employee/detail-employee.component";

const UserRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: "employees",
        component: ListEmployeesComponent,
        children: [
          { path: "add", component: AddEmployeeComponent },
          { path: ":id", component: DetailEmployeeComponent },
          { path: ":id/edit", component: EditEmployeeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
