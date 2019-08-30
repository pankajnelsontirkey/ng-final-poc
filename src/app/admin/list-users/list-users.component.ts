import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { UserItem } from 'src/app/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users: UserItem[];
  usersSubscription: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged.subscribe(users => {
      this.users = users;
    });
    this.users = this.usersService.getUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
