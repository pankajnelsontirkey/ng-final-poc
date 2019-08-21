import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static: false }) loginForm: FormGroup;
  error: any = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    // Check for invalid form first.
    /* Always handle exceptions/errors first! */
    if (!loginForm.valid) {
      // Form data invalid, can't proceed.
      this.error = loginForm.errors;
      return;
    } else {
      this.authService.login(loginForm.value);
    }
  }
}
