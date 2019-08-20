import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static: false }) loginForm: FormGroup;
  loginMode: boolean = true;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.loginForm.valid);
  }

  toggleMode() {
    this.loginMode = !this.loginMode;
  }
}
