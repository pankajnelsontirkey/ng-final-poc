import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeModel } from "../shared/models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  /* Add one employee */
  addEmployee(employee: EmployeeModel) {
    this.http
      .post(
        `${environment.jsonSvURL}${environment.employeesCollection}`,
        employee
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log(error);
        }
      );
  }

  /* Get all employees */
  getEmployees(filter?: { type: string; limit: number }) {
    if (filter) {
      console.log(filter);
    } else {
      this.http
        .get(`${environment.jsonSvURL}${environment.employeesCollection}`)
        .subscribe(
          responseData => {
            console.log(responseData);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  /* Get employee by id */
  getEmployee(id: string) {
    this.http
      .get(`${environment.jsonSvURL}${environment.employeesCollection}`, {
        params: {
          id: id
        }
      })
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log(error);
        }
      );
  }

  /* Method to get  */
}
