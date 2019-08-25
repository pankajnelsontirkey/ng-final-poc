import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/adminDashboard.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { UserDashboardComponent } from './user/userDashboard.component';
import { ListEmployeesComponent } from './user/list-employees/list-employees.component';
import { AddEmployeesComponent } from './user/list-employees/add-employees/add-employees.component';
import { EditEmployeeComponent } from './user/list-employees/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoginComponent,
    AdminDashboardComponent,
    AddUsersComponent,
    ListUsersComponent,
    UserDashboardComponent,
    ListEmployeesComponent,
    AddEmployeesComponent,
    EditEmployeeComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
