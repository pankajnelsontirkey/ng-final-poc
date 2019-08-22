import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { UserModel, LoginModel } from "../shared/models";
import { DataStorageService } from "../shared/data-storage.service";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  currentUser = new BehaviorSubject<UserModel>(null);

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  login(loginData: LoginModel) {
    this.dataStorageService.fetchUsers().subscribe(users => {
      /* Result can be either a user or an error */
      let result = this.checkEmailPassword(users, loginData);
      console.log(result);
      if (!result["error"]) {
        this.handleAuthentication(<UserModel>result);
      }
    });
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }

  autoLogin() {
    if (localStorage.getItem("currentUser")) {
      let localUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(localUser);
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

  private handleAuthentication(user: UserModel) {
    let localUser = {
      _id: user._id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      expirationTimer: Date.now() + 3600
    };
    localStorage.setItem("currentUser", JSON.stringify(localUser));
    this.currentUser.next(user);
    this.redirectToDashboard(<"admin" | "user">user.role);
  }

  private redirectToDashboard(role: "admin" | "user") {
    switch (role) {
      case "admin":
        this.router.navigate(["/admin"]);
        break;
      case "user":
        this.router.navigate(["/dashboard"]);
        break;
      // Default case should never be realistically reached.
      default:
        console.log("How'd you reach here?");
        this.router.navigate(["/login"]);
    }
  }
}
