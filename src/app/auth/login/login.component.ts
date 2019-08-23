import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

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
    this.authService.currentUserChanged.subscribe(currentUser => {
      if (currentUser) {
        this.authService.getNextRoute(<"admin" | "user" | null>(
          currentUser.role
        ));
      }
    });
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      // Show Error Alert Modal
      return;
    } else {
      this.authService.login(loginForm.value).subscribe(
        nextRoute => {
          this.router.navigate([nextRoute]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
