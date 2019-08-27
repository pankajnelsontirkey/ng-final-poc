import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { v4 as uuid } from "uuid";

import { EmployeeModel } from "../shared/models";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  employees: EmployeeModel[];
  employeesChanged = new BehaviorSubject<EmployeeModel[]>(null);

  constructor(private dataStorageService: DataStorageService) {}

  /* Add one employee */
  addEmployee(employeeForm) {
    /* Create Employee model object */
    let newEmployee: EmployeeModel = {
      _id: uuid(),
      firstName: employeeForm.firstName,
      lastName: employeeForm.lastName,
      email: employeeForm.email,
      employeeCode: employeeForm.employeeCode,
      createdAt: Date.now()
    };

    /* Call data service here to fetch employees from database */
    this.dataStorageService.addEmployeeToDB(newEmployee).subscribe(
      newEmployee => {
        this.employees.push(newEmployee);
        this.employeesChanged.next(this.employees.slice());
      },
      error => {
        console.log(error);
      }
    );
  }

  /* Get all employees */
  getEmployees(filter?: { type: string; limit: number }) {
    /* Call DataStorageService to fetch employees from database */
    this.dataStorageService.getEmployeesFromDB().subscribe(employees => {
      console.log(employees);
      this.employees = employees;
      this.employeesChanged.next(this.employees.slice());
      console.log(this.employees);
    });
  }

  /* Get employee by id */
  getEmployee(id: string) {
    /* this.http
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
      ); */
  }

  /* Method to get  */
}
