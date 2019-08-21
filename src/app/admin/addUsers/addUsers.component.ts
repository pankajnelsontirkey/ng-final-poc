import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-addUser",
  templateUrl: "./addUsers.component.html",
  styleUrls: ["./addUsers.component.scss"]
})
export class AddUsersComponent implements OnInit {
  addUserForm: FormGroup;
  constructor() {}

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
      role: new FormControl("hr", [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.addUserForm.value);
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
      if (!cpassword === password) {
        return {
          errorPassword: "Password confirmation mismatch!"
        };
      } else {
        return null;
      }
    }
  }
}
