import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EmployeeModel, EmployeeForm } from '../shared/models';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  employees: EmployeeModel[];
  employeesChanged = new BehaviorSubject<EmployeeModel[]>(null);

  selectedEmployee: EmployeeModel;
  selectedEmployeeChanged = new BehaviorSubject<EmployeeModel>(null);

  constructor(private dataStorageService: DataStorageService) {}

  /* Add one employee */
  saveEmployee(employeeForm) {
    /* Create Employee model object */
    let newEmployee: EmployeeModel = {
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
  fetchEmployees() {
    /* Call DataStorageService to fetch employees from database */
    this.dataStorageService.getEmployeesFromDB().subscribe(employees => {
      this.employees = employees;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  /* Get employee by id */
  getEmployeeById(id: string) {
    this.dataStorageService.getEmployeeById(id).subscribe(
      employeeById => {
        this.selectedEmployee = employeeById;
        this.selectedEmployeeChanged.next(this.selectedEmployee);
      },
      error => {
        console.log(error);
      }
    );
  }

  /* Update employee by id */
  updateEmployee(id: string, employeeData: EmployeeForm) {
    return this.dataStorageService.updateEmployee(id, employeeData);
  }
}
