import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { v4 as uuid } from "uuid";

import { ManageUsersService } from "../manageUsers.service";
import { UserModel } from "src/app/shared/models";

@Component({
  selector: "app-addUser",
  templateUrl: "./addUsers.component.html",
  styleUrls: ["./addUsers.component.scss"]
})
export class AddUsersComponent implements OnInit {
  addUserForm: FormGroup;
  @Output("closeAddUser") closeAddUser = new EventEmitter<boolean>();

  constructor(private manageUsersService: ManageUsersService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        this.checkEmail.bind(this)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      cpassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        this.confirmPassword.bind(this)
      ]),
      role: new FormControl("user", [Validators.required])
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      let user: UserModel = {
        _id: uuid(),
        firstName: this.addUserForm.get("firstName").value,
        lastName: this.addUserForm.get("lastName").value,
        email: this.addUserForm.get("email").value,
        password: this.addUserForm.get("password").value,
        role: this.addUserForm.get("role").value
      };
      this.manageUsersService.saveUser(user);
    }
  }

  checkEmail() {
    if (this.addUserForm) {
      const emailPattern = /\w+@\w+\.\w{2,3}/;
      if (!emailPattern.test(this.addUserForm.get("email").value)) {
        return { errorEmail: "Email is invalid!" };
      } else {
        console.log("Testing - ", emailPattern.test("test@mail.com"));
        return null;
      }
    }
  }

  confirmPassword() {
    if (this.addUserForm) {
      let password = this.addUserForm.get("password").value;
      let cpassword = this.addUserForm.get("cpassword").value;
      // console.log(this.addUserForm.get("cpassword"));

      if (cpassword === password) {
        return null;
      } else {
        return { passwordMismatch: "Password confirmation mismatch!" };
      }
    }
  }

  onClose() {
    this.closeAddUser.emit(true);
  }
}
