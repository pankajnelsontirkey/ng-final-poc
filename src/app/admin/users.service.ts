import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { UserModel, UserItem } from "../shared/models";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable()
export class UsersService {
  users: UserItem[] = [];
  usersChanged = new Subject<UserItem[]>();

  constructor(private dataStorageService: DataStorageService) {}

  saveUser(user: UserModel) {
    this.dataStorageService.addUserToDB(user).subscribe(
      user => {
        console.log(user);
        let userItem: UserItem;
        userItem._id = user._id;
        userItem.firstName = user.firstName;
        userItem.lastName = user.lastName;
        userItem.email = user.email;
        userItem.role = user.role;
        this.users.push(userItem);
        this.usersChanged.next(this.users.slice());
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchUsers() {
    this.dataStorageService.getUsersFromDB().subscribe(users => {
      this.users = users;
      this.usersChanged.next(this.users.slice());
    });
  }

  getUsers() {
    return this.users.slice();
  }
}
