import { Component, OnInit } from "@angular/core";
import { ManageUsersService } from "../manageUsers.service";
import { UserModel } from "src/app/shared/models";

@Component({
  selector: "app-listUsers",
  templateUrl: "./listUsers.component.html",
  styleUrls: ["./listUsers.component.scss"]
})
export class ListUsersComponent implements OnInit {
  users: UserModel[];

  constructor(private manageUsersService: ManageUsersService) {}

  ngOnInit() {
    this.manageUsersService.getUsers();
  }
}
