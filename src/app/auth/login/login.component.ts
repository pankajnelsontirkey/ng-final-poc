import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) loginForm: FormGroup;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        if (currentUser) {
          let nextRoute = this.authService.getHomeRoute(currentUser.role);
          if (nextRoute !== "/login") {
            this.router.navigate([nextRoute]);
          }
        }
      }
    );
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      // Show Error Alert Modal
      return;
    } else {
      this.authService.login(loginForm.value);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
