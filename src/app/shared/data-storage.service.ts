import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel, EmployeeModel, UserItem } from './models';
import { environment } from 'src/environments/environment';
import { ManageUsersService } from '../admin/manageUsers.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  addUserToDB(user: UserModel) {
    return this.http.post(`${environment.jsonSvURL}${environment.usersCollection}`, user);
  }

  /* Only to be used by authService */
  getUsersForAuth() {
    return this.http
      .get<UserModel[]>(`${environment.jsonSvURL}${environment.usersCollection}`)
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
      .get<UserModel[]>(`${environment.jsonSvURL}${environment.usersCollection}`)
      .pipe(map(users => users.find(user => user._id === _id).role));
    /* pipe the response; use map to Observable value, only return role since other details for currentUser are already available from localstorage in authService. */
  }

  /** Only to be used by admin role
   * Fetches users from Db for displaying in listUsers on admin dashboard
   */
  getUsersFromDB() {
    return this.http
      .get<UserModel[]>(`${environment.jsonSvURL}${environment.usersCollection}`)
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

  addEmployeeToDB(employee: EmployeeModel) {}

  getEmployeesFromDB() {}

  // getEmployeeFromDB(id: string) {}
}
