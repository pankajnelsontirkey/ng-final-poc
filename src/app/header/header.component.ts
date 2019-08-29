import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUserName: string = "";
  currentRole: string = null;
  userSubscription: Subscription;

  currentPage: string = "";

  isLoggedIn: boolean = false;
  collapsed: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        if (currentUser) {
          this.currentUserName = currentUser.fullName;
          this.currentRole = currentUser.role;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          this.currentRole = null;
        }
      }
    );

    this.authService.currentPageChanged.subscribe(path => {
      this.currentPage = path;
    });
  }

  onLogout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  redirectToHome() {
    let nextRoute = this.authService.getHomeRoute(this.currentRole);

    this.router.navigate([nextRoute]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
