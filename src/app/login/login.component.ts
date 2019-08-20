import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static: false }) loginForm: FormGroup;
  loginMode: boolean = true;
  error: any = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = form.errors;
      console.log(
        form.controls["email"]["errors"],
        form.controls["password"]["errors"]
      );
      return;
    }
    // Else proceed to make http call for signUp/signIn
    else {
      // call login method in auth.service if loginMode is true;
      if (this.loginMode) {
        console.log(`${form.value.email} - ${form.value.password}`);

        // this.authService.login(this.loginForm.value.);
      } else {
        // call login method in auth.service if loginMode is true;
        // this.authService.signUp();
      }
    }
  }

  toggleMode() {
    this.loginMode = !this.loginMode;
  }
}
