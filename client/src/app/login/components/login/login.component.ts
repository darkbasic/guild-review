import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login({username, password}: {username: string; password: string}) {
    const auth = this.loginService.createBase64Auth(username, password);
    this.loginService.storeAuthHeader(auth);
    this.router.navigate(['/prs']);
  }
}
