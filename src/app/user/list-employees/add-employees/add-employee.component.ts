import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AddUserModel, EmployeeModel } from "src/app/shared/models";
import { EmployeesService } from "../../employees.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  constructor(
    private employeeService: EmployeesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, this.emailValidator]),
      employeeCode: new FormControl(null, [
        Validators.required,
        this.employeeCodeValidator
      ])
    });
  }

  onSubmit() {
    this.employeeService.saveEmployee(this.addEmployeeForm.value);
    let nextRoute = this.authService.getHomeRoute("role");
    this.router.navigate([nextRoute]);
  }

  emailValidator(control: FormControl) {
    const emailPattern = /^\w+@\w+\.\w{2,3}$/;
    if (!emailPattern.test(control.value)) {
      return { error: "Enter a valid email. example@domain.com" };
    }
    return null;
  }

  employeeCodeValidator(control: FormControl) {
    const empCodePattern = /^v\d{4,4}$/gi;
    if (!empCodePattern.test(control.value)) {
      return {
        error: "Employee code must start with 'V' followed by a four digits!"
      };
    } else {
      return null;
    }
  }
}
