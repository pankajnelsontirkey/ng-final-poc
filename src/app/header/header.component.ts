import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentUserModel } from '../shared/models';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  public currentUser: CurrentUserModel = null;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.currentUser = {
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          expirationTimer: Date.now() + 3600
        };
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
