import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./admin/admin.guard";
import { UserGuard } from "./user/user.guard";
import { LoginComponent } from "./auth/login/login.component";
import { AdminDashboardComponent } from "./admin/adminDashboard.component";
import { ListUsersComponent } from "./admin/listUsers/listUsers.component";
import { AddUsersComponent } from "./admin/addUsers/addUsers.component";
import { UserDashboardComponent } from "./user/userDashboard.component";
import { ListEmployeesComponent } from "./user/list-employees/list-employees.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    component: AdminDashboardComponent,
    /* Add guard to allow only admin logins to reach here */
    canActivate: [AuthGuard, AdminGuard]
    /* children: [
      // {
      //   path: "list-users",
      //   component: ListUsersComponent
      // },
      // {
      //   path: "add-user",
      //   component: AddUsersComponent
      // }
    ] */
  },
  {
    path: "dashboard",
    component: UserDashboardComponent,
    canActivate: [AuthGuard, UserGuard],
    children: [
      {
        path: "employees",
        component: ListEmployeesComponent,
        children: [
          { path: "add", component: UserDashboardComponent },
          { path: ":id", component: UserDashboardComponent },
          { path: ":id/edit", component: UserDashboardComponent }
        ]
      }
    ]
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
