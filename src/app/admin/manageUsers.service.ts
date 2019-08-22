import { Injectable } from "@angular/core";

import { UserModel } from "../shared/models";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({
  providedIn: "root"
})
export class ManageUsersService {
  users: UserModel[] = [];

  constructor(private dataStorageService: DataStorageService) {}

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
      this.users = users;
    });
  }

  getUser(id: string) {
    this.dataStorageService.fetchUser(id);
  }
}
