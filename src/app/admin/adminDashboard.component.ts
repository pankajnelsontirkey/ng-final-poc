import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../shared/models';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  user: UserModel;
  userSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
