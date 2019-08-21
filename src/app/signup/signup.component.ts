import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signupForm = new FormGroup({
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
      role: new FormControl("")
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  checkEmail() {
    if (this.signupForm) {
      const emailPattern = /\w+@\w+\.\w{2,3}/;
      if (!emailPattern.test(this.signupForm.get("email").value)) {
        return { errorEmail: "Email is invalid!" };
      } else {
        console.log("Testing - ", emailPattern.test("test@mail.com"));
        return null;
      }
    }
  }

  confirmPassword() {
    if (this.signupForm) {
      let password = this.signupForm.get("password").value;
      let cpassword = this.signupForm.get("cpassword").value;
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
