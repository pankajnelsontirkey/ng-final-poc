import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeesComponent } from "./employees/employees.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
    //TODO Add Auth Guard here
  },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  {
    path: "employees",
    component: EmployeesComponent,
    children: [
      { path: "add", component: DashboardComponent },
      { path: ":id", component: DashboardComponent },
      { path: ":id/edit", component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
