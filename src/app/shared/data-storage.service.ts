import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { UserModel, EmployeeModel, UserItem, EmployeeForm } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  /* Only to be used by authService */
  getUsersForAuth() {
    return this.http.get<UserModel[]>(
      `${environment.restApiUrl}${environment.usersCollection}`
    );
  }

  /* Only to be used by authService */
  getUserRoleByUid(_id: string) {
    return (
      this.http
        .get<UserModel[]>(
          `${environment.restApiUrl}${environment.usersCollection}`
        )
        /* pipe the response; use map to Observable value, only return role since other details for currentUser are already available from localstorage in authService. */
        .pipe(map(users => users.find(user => user._id === _id).role))
    );
  }

  /**
   * Saves users to Db
   * Only to be used by admin role
   */
  addUserToDB(user: UserModel) {
    return this.http.post<UserModel>(
      `${environment.restApiUrl}${environment.usersCollection}`,
      user
    );
  }

  /**
   * Fetches users from Db for displaying in listUsers on admin dashboard
   * Only to be used by admin role
   */
  getUsersFromDB() {
    return this.http
      .get<UserModel[]>(
        `${environment.restApiUrl}${environment.usersCollection}`
      )
      .pipe(
        map(responseData => {
          return <UserItem[]>responseData.map(user => ({
            id: user._id,
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
      `${environment.restApiUrl}${environment.employeesCollection}`,
      newEmployee
    );
  }

  getEmployeesFromDB() {
    return this.http.get<EmployeeModel[]>(
      `${environment.restApiUrl}${environment.employeesCollection}`
    );
  }

  getEmployeeById(id: string) {
    return this.http.get<EmployeeModel>(
      `${environment.restApiUrl}${environment.employeesCollection}/${id}`
    );
  }

  /* Update employee */
  updateEmployee(id: string, employeeData: EmployeeForm) {
    return this.http.put<EmployeeModel>(
      `${environment.restApiUrl}${environment.employeesCollection}/${id}`,
      employeeData
    );
  }
}
