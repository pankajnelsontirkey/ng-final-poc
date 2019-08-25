import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.currentUserChanged.subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      console.log(this.isLoggedIn);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
