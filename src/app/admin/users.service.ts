import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserModel } from '../shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  adduser(user: UserModel) {
    return this.http.post(`${environment.jsonSvURL}${environment.employeesCollection}`, user).pipe(
      tap(responseData => {
        console.log(responseData);
      })
    );
  }
}
