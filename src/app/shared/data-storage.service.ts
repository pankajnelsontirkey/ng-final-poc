import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { v4 as uuid } from "uuid";

import { UserModel } from "./models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  addUser(userForm) {
    const user: UserModel = { ...userForm, _id: uuid() };
    return this.http.post(
      `${environment.jsonSvURL}${environment.usersCollection}`,
      user
    );
  }

  fetchUsers() {
    return this.http.get<UserModel[]>(
      `${environment.jsonSvURL}${environment.usersCollection}`
    );
  }

  fetchUser(_id: string) {}
}
