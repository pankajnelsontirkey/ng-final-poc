import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { UserModel, LoginModel, CurrentUserModel } from "../shared/models";
import { compileNgModule } from "@angular/compiler";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isLoggedIn: boolean = false;
  private currentUser: CurrentUserModel = null;

  constructor(private http: HttpClient) {}

  // Login for both admin & users
  login(loginData: LoginModel) {
    this.authenticateUser(loginData).subscribe(res => {});
  }

  // Add user can only be done by admin
  adduser(user: UserModel) {
    return this.http
      .post(`${environment.jsonSvURL}${environment.employeesCollection}`, user)
      .pipe(
        tap(responseData => {
          console.log(responseData);
        })
      );
  }

  private authenticateUser(loginData: LoginModel) {
    return this.http
      .get(`${environment.jsonSvURL}${environment.usersCollection}`)
      .pipe(
        tap(usersList => {
          console.log(loginData);
          console.log(usersList);

          for (let user in usersList) {
            console.log(user["email"], loginData.email);

            // if (user["email"] === loginData.email) {
            //   console.log("Email found!");
            //   if (user["passwrod"] === loginData.password) {
            //     console.log("Password Match!");
            //     break;
            //   }
            // } else {
            //   console.log("Email not found");
            // }
          }
        })
      );
  }

  // Getter to check whether logged in or not.
  get loggedIn() {
    return this.isLoggedIn;
  }

  set user(user) {
    // Add code to add expiration, etc to user
    this.currentUser = user;
  }

  get user() {
    return this.currentUser;
  }
  // Method to manage login (add tokens, generate expiration, etc.)
  /* manageLogin() {} */
}
