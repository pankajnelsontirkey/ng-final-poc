import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeesService } from "../../employees.service";
import { EmployeeModel } from "src/app/shared/models";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"]
})
export class EditEmployeeComponent implements OnInit {
  employee: EmployeeModel;
  editEmployeeForm: FormGroup;
  id: string;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;
      console.log(this.id, this.editMode);
    });

    this.employeesService.selectedEmployeeChanged.subscribe(
      selectedEmployee => {
        this.employee = selectedEmployee;
      }
    );
    this.initEditEmployeeForm();
  }

  initEditEmployeeForm() {
    this.editEmployeeForm = new FormGroup({
      employeeCode: new FormControl(this.employee.employeeCode, [
        Validators.required
      ]),
      firstName: new FormControl(this.employee.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.employee.lastName, [Validators.required]),
      email: new FormControl(this.employee.email, [
        Validators.required,
        Validators.email
      ])
    });
  }

  onSubmit() {
    console.log(this.editEmployeeForm.value, this.editEmployeeForm.valid);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
