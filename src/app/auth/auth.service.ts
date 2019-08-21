import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

import { environment } from "../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface currentUser {
  username: string;
  email: string;
  role: string;
  token: number;
  expirationTimer: number;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private isLoggedIn: boolean = false;
  private user: currentUser = null;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.signUpURL}${environment.firebaseKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(responseData => {
          console.log(responseData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.singInURL}${environment.firebaseKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(responseData => {
          console.log(responseData);
        })
      );
  }

  // Getter to check whether logged in or not.
  get loggedIn() {
    return this.isLoggedIn;
  }

  set currentUser(user: currentUser) {
    this.currentUser = user;
  }

  get currentUser() {
    return this.currentUser;
  }
  // Method to manage login (add tokens, generate expiration, etc.)
  manageLogin() {}
}
