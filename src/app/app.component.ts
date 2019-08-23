import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private isLoggedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      if (currentUser) {
        this.isLoggedIn = true;
      }
    });

    this.authService.autoLogin();
  }
}
