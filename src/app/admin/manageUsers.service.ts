import { Injectable } from "@angular/core";

import { UserModel } from "../shared/models";
import { DataStorageService } from "../shared/data-storage.service";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ManageUsersService {
  users: UserModel[] = [];
  usersChanged = new BehaviorSubject<UserModel[]>(null);

  constructor(private dataStorageService: DataStorageService) {
    this.getUsers();
  }

  adduser(user: UserModel) {
    this.dataStorageService.addUser(user).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.dataStorageService.fetchUsers().subscribe(users => {
      if (users) {
        this.users = users;
        return this.users.slice();
      }
    });
  }

  getUser(id: string) {
    this.dataStorageService.fetchUser(id);
  }
}
