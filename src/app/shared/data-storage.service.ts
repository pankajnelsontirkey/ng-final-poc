import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { UserModel, EmployeeModel, UserItem } from "./models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  /* Only to be used by authService */
  getUsersForAuth() {
    return this.http
      .get<UserModel[]>(
        `${environment.jsonSvURL}${environment.usersCollection}`
      )
      .pipe(
        map(responseData => {
          return <UserModel[]>responseData.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role
          }));
        })
      );
  }

  /* Only to be used by authService */
  getUserRoleByUid(_id: string) {
    return this.http
      .get<UserModel[]>(
        `${environment.jsonSvURL}${environment.usersCollection}`
      )
      .pipe(map(users => users.find(user => user._id === _id).role));
    /* pipe the response; use map to Observable value, only return role since other details for currentUser are already available from localstorage in authService. */
  }

  /**
   * Saves users to Db
   * Only to be used by admin role
   */
  addUserToDB(user: UserModel) {
    return this.http
      .post<UserModel>(
        `${environment.jsonSvURL}${environment.usersCollection}`,
        user
      )
      .pipe(
        map(responseData => {
          return <UserItem>{
            _id: responseData._id,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            email: responseData.email,
            role: responseData.role
          };
        })
      );
  }

  /**
   * Fetches users from Db for displaying in listUsers on admin dashboard
   * Only to be used by admin role
   */
  getUsersFromDB() {
    return this.http
      .get<UserModel[]>(
        `${environment.jsonSvURL}${environment.usersCollection}`
      )
      .pipe(
        map(responseData => {
          return <UserItem[]>responseData.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }));
        })
      );
  }

  addEmployeeToDB(newEmployee: EmployeeModel) {
    return this.http.post<EmployeeModel>(
      `${environment.jsonSvURL}${environment.employeesCollection}`,
      newEmployee
    );
  }

  getEmployeesFromDB() {
    return this.http.get<EmployeeModel[]>(
      `${environment.jsonSvURL}${environment.employeesCollection}`
    );
  }

  // getEmployeeFromDB(id: string) {}
}
