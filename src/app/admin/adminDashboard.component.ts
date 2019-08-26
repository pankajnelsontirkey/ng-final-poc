import { Component, OnInit } from "@angular/core";

import { UsersService } from "./users.service";

@Component({
  selector: "app-admin",
  templateUrl: "./adminDashboard.component.html",
  styleUrls: ["./adminDashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  showAddUser: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers();
  }

  toggleAddUser() {
    this.showAddUser = !this.showAddUser;
  }
}
