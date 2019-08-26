import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  subscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.subscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        if (currentUser) {
          console.log(currentUser.role);
          this.isLoggedIn = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
