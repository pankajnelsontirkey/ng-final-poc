import { Component, OnInit, OnDestroy } from "@angular/core";
import { ManageUsersService } from "../manageUsers.service";
import { UserItem } from "src/app/shared/models";
import { Subscription } from "rxjs";

@Component({
  selector: "app-listUsers",
  templateUrl: "./listUsers.component.html",
  styleUrls: ["./listUsers.component.scss"]
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users: UserItem[];
  usersSubscription: Subscription;

  constructor(private manageUsersService: ManageUsersService) {}

  ngOnInit() {
    this.usersSubscription = this.manageUsersService.usersChanged.subscribe(
      users => {
        this.users = users;
      }
    );
    this.users = this.manageUsersService.getUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
