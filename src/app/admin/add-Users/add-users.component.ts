import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { v4 as uuid } from "uuid";

import { UsersService } from "../users.service";
import { UserModel } from "src/app/shared/models";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-users.component.html",
  styleUrls: ["./add-users.component.scss"]
})
export class AddUsersComponent implements OnInit {
  addUserForm: FormGroup;
  @Output("closeAddUser") closeAddUser = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) {}

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
        firstName: this.addUserForm.get("firstName").value.trim(),
        lastName: this.addUserForm.get("lastName").value.trim(),
        email: this.addUserForm.get("email").value,
        password: this.addUserForm.get("password").value.trim(),
        role: this.addUserForm.get("role").value
      };
      this.usersService.saveUser(user);
      this.onClose();
    }
  }

  checkEmail() {
    if (this.addUserForm) {
      const emailPattern = /\w+@\w+\.\w{2,3}/;
      if (!emailPattern.test(this.addUserForm.get("email").value)) {
        return { errorEmail: "Email is invalid!" };
      } else {
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
