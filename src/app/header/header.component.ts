import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  currentUserName: string = "";
  currentRole: string = null;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      if (currentUser) {
        this.currentUserName = currentUser.fullName;
        this.currentRole = currentUser.role;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  redirectToHome() {
    this.authService.getHomeRoute(this.currentRole);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
