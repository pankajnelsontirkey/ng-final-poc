import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserModel, LoginModel, CurrentUserModel } from '../shared/models';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: CurrentUserModel;
  currentUserChanged = new BehaviorSubject<CurrentUserModel>(null);

  currentPage: string = '';
  currentPageChanged = new BehaviorSubject<string>(null);

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  login(loginData: LoginModel) {
    this.dataStorageService.getUsersForAuth().subscribe(
      users => {
        // console.log(users);
        let userVerified = this.checkEmailPassword(users, loginData);
        if (!userVerified['error']) {
          this.handleAuthentication(<UserModel>userVerified);
        } else {
          return { error: 'Invalid credentials!' };
        }
      },
      error => {
        console.log('error', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserChanged.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin() {
    let localUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!localUser) {
      return;
    }

    this.dataStorageService
      .getUserRoleByUid(localUser['id'])
      .subscribe(role => {
        this.currentUser = { ...localUser, role };
        this.currentUserChanged.next(this.currentUser);
      });
  }

  /** TODO */
  /* Auto Logout after expiration time */
  // autoLogout() {}

  getHomeRoute(role: string) {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'user':
        return '/dashboard';
      default:
        return '/login';
    }
  }

  redirectFromAuth(route: string) {
    this.router.navigate([route]);
  }

  setCurrentRoute(path: any) {
    this.currentPage = path;
    this.currentPageChanged.next(this.currentPage);
  }

  private checkEmailPassword(users: UserModel[], loginData: LoginModel) {
    for (let user of users) {
      if (user['email'] === loginData['email']) {
        if (user['password'] === loginData['password']) {
          return user;
        }
      }
    }
    return { error: 'Email/Password is incorrect' };
  }

  private handleAuthentication(user: UserModel) {
    const expirationTimer = Date.now() + 3600;
    /** currentUser will be kept in authService; has role which can be called for role-based access */

    let currentUser: CurrentUserModel = {
      id: user._id,
      fullName: user.firstName + ' ' + user.lastName,
      email: user.email,
      role: user.role,
      expirationTimer: expirationTimer
    };

    this.currentUser = currentUser;
    this.currentUserChanged.next(this.currentUser);

    /** localUser for storing in localStorage; should not hold 'role' property */
    let localUser = {
      id: this.currentUser.id,
      email: this.currentUser.email,
      fullName: this.currentUser.fullName,
      expirationTimer: this.currentUser.expirationTimer
    };

    localStorage.setItem('currentUser', JSON.stringify(localUser));
  }
}
