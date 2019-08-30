import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserDashboardComponent } from './userDashboard.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AddEmployeeComponent } from './list-employees/add-employees/add-employee.component';
import { EditEmployeeComponent } from './list-employees/edit-employee/edit-employee.component';
import { DetailEmployeeComponent } from './list-employees/detail-employee/detail-employee.component';
import { UserRoutingModule } from './user-routing.module';
import { EmployeesService } from './employees.service';
import { SummaryComponent } from './summary-employees/summary.component';
import { ListItemComponent } from './list-employees/list-item/list-item.component';
import { TextFilterPipe } from './list-employees/text-filter.pipe';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DetailEmployeeComponent,
    SummaryComponent,
    ListItemComponent,
    TextFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  providers: [EmployeesService],
  bootstrap: [UserDashboardComponent]
})
export class UserModule {}
