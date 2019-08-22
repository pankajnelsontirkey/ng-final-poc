import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserModel, EmployeeModel } from "./models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  addUser(user: UserModel) {
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

  addEmployee(employee: EmployeeModel) {}

  fetchEmployees() {}

  fetchEmployee(id: string) {}
}
