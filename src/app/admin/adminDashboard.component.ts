import { Component, OnInit } from "@angular/core";

import { ManageUsersService } from "./manageUsers.service";

@Component({
  selector: "app-admin",
  templateUrl: "./adminDashboard.component.html",
  styleUrls: ["./adminDashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  showAddUser: boolean = false;

  constructor(private manageUsersService: ManageUsersService) {}

  ngOnInit() {
    this.manageUsersService.fetchUsers();
  }

  toggleAddUser() {
    this.showAddUser = !this.showAddUser;
  }
}
