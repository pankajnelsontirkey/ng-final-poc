import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) loginForm: FormGroup;
  error: any = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  onSubmit(loginForm: NgForm) {
    // Check for invalid form first.
    /* Always handle exceptions/errors first! */
    if (!loginForm.valid) {
      // Form data invalid, can't proceed.
      this.error = loginForm.errors;
      return;
    } else {
      this.authService.login(loginForm.value).subscribe(
        user => {
          console.log(user);

          // this.router.navigate(['/dashboard']);
        },
        errorMessage => {
          console.log('error block', errorMessage);
        }
      );
    }
  }
}
