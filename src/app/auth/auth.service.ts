import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { UserModel, LoginModel, CurrentUserModel } from "../shared/models";
import { DataStorageService } from "../shared/data-storage.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  currentUser: CurrentUserModel;
  currentUserChanged = new Subject<CurrentUserModel>();

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  login(loginData: LoginModel) {
    return this.dataStorageService.getUsersForAuth().pipe(
      map(
        users => {
          let userVerified = this.checkEmailPassword(users, loginData);

          if (!userVerified["error"]) {
            let nextRoute = this.handleAuthentication(<UserModel>userVerified);
            return nextRoute;
          } else {
            return "/login";
          }
        },
        error => {
          console.log("error", error);
        }
      )
    );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }

  autoLogin() {
    let localUser = JSON.parse(localStorage.getItem("currentUser"));

    if (localUser) {
      this.dataStorageService
        .getUserRoleByUid(localUser["_id"])
        .subscribe(role => {
          this.currentUser = { ...localUser, role };
          this.currentUserChanged.next(this.currentUser);
        });
    }
  }

  private checkEmailPassword(users: UserModel[], loginData: LoginModel) {
    for (let user of users) {
      if (user["email"] === loginData["email"]) {
        if (user["password"] === loginData["password"]) {
          return user;
        }
      }
    }
    return { error: "Email/Password is incorrect" };
  }

  private handleAuthentication(user: UserModel): string {
    const expirationTimer = Date.now() + 3600;
    /** currentUser will be kept in authService; has role which can be called for role-based access */

    let currentUser: CurrentUserModel = {
      _id: user._id,
      fullName: user.firstName + " " + user.lastName,
      email: user.email,
      role: user.role,
      expirationTimer: expirationTimer
    };

    this.currentUser = currentUser;
    this.currentUserChanged.next(this.currentUser);

    /** localUser for storing in localStorage; should not hold 'role' property */
    let localUser = {
      _id: this.currentUser._id,
      email: this.currentUser.email,
      fullName: this.currentUser.fullName,
      expirationTimer: this.currentUser.expirationTimer
    };

    localStorage.setItem("currentUser", JSON.stringify(localUser));

    return this.getNextRoute(<"admin" | "user" | null>this.currentUser.role);
  }

  getNextRoute(role: "admin" | "user" | null): string {
    switch (role) {
      case "admin":
        return "/admin";
      case "user":
        return "/dashboard";
      default:
        return "/login";
    }
  }
}
