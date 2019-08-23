import { Injectable } from "@angular/core";

import { UserModel, UserItem } from "../shared/models";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({
  providedIn: "root"
})
export class ManageUsersService {
  users: UserItem[] = [];
  usersChanged = new Subject<UserItem[]>();

  constructor(private dataStorageService: DataStorageService) {}

  saveUser(user: UserModel) {
    this.dataStorageService.addUserToDB(user).subscribe(
      response => {
        console.log(response);
        this.users.push(user);
        this.usersChanged.next(this.users.slice());
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchUsers() {
    this.dataStorageService.getUsersFromDB().subscribe(responseData => {
      this.users = responseData;
      this.usersChanged.next(this.users.slice());
    });
  }

  getUsers() {
    return this.users.slice();
  }
}
