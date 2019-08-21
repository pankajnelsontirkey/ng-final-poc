import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
// import { uuidv4 } from 'uuid/v4'; /* Using v4 of uuid - gives random id */

import { environment } from '../../environments/environment';
import { UserModel, LoginModel } from '../shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {}

  /* Login for both admin & users */
  login(loginData: LoginModel) {
    return this.http
      .get<UserModel[]>(`${environment.jsonSvURL}${environment.usersCollection}`)
      .pipe(
        map(usersList => {
          let loginError: string = null;
          for (let user of usersList) {
            if (user['email'] !== loginData.email) {
              // Case: Email not found in users database
              loginError = 'Email not found.';
            } else {
              if (user['password'] !== loginData.password) {
                // Case: Email found BUT Password incorrect
                loginError = 'Invalid Password.';
                return user;
              } else {
                // Case: Email found && Password correct
                loginError = null;
                this.handleAuthentication(user);
                break;
              }
            }
          }
          if (loginError) {
            console.log(loginError);
          }
        })
      );
  }

  logout() {
    /* Remove user from localstorage */
    localStorage.removeItem('currentUser');
    /* Set user to null */
    this.user.next(null);
  }

  autoLogin() {
    let localUser = JSON.parse(localStorage.getItem('currentUser'));
    let user;
    this.user.next;
  }

  /**
   * After successful login, set username, role, token, etc of current logged-in user.
   **/
  private handleAuthentication(user: UserModel) {
    /** Adding role key to user is required! Since user is private to auth service, it can safely hold role.  */
    this.user.next(user);

    /** Using a temporary localUser that will be set to localStorage; it should not store user 'role' */
    let localUser = {
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      expirationTimer: Date.now() + 3600
    };

    /* Setting user in local storage */
    localStorage.setItem('currentUser', JSON.stringify(localUser));
  }
}
