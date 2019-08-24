import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  currentUserName: string = "";
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      console.log(currentUser);

      if (currentUser) {
        this.currentUserName = currentUser.fullName;
        console.log(this.currentUserName);
      }
    });
  }

  onLogout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  redirectToHome() {
    this.authService.getNextRoute(<"admin" | "user" | null>(
      this.authService.currentUser.role
    ));
  }

  ngOnDestroy() {}
}
