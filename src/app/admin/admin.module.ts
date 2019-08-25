import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './adminDashboard.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersService } from './manageUsers.service';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent, AddUsersComponent, ListUsersComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, AdminRoutingModule],
  providers: [ManageUsersService]
})
export class AdminModule {}
