import { Component, OnInit, OnDestroy } from "@angular/core";
import { CurrentUserModel } from "../shared/models";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  currentUserName: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {}
}
