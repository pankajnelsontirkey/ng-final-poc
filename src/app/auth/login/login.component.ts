import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserModel } from "src/app/shared/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static: false }) loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    } else {
      this.authService.login(loginForm.value);
    }
  }
}
