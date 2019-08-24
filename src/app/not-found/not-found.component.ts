import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"]
})
export class NotFoundComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      console.log(this.isLoggedIn);
    });
  }
}
