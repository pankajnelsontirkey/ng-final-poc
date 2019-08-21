import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/adminDashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { ListUsersComponent } from './admin/listUsers/listUsers.component';
import { AddUsersComponent } from './admin/addUsers/addUsers.component';
import { UserDashboardComponent } from './user/userDashboard.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user-not-found', component: UserNotFoundComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    /* Add guard to allow only admin logins to reach here */
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
        children: [
          {
            path: 'add-users',
            component: AddUsersComponent
          }
        ]
      }
    ]
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'employees',
        component: EmployeesComponent,
        children: [
          { path: 'add', component: UserDashboardComponent },
          { path: ':id', component: UserDashboardComponent },
          { path: ':id/edit', component: UserDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
