import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSubscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        currentUser ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
      }
    );

    /* Get current path from router */
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.authService.setCurrentRoute(event.url);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
