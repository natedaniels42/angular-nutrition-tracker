import { Component, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  @Output() loginEvent = new EventEmitter();
  user: Partial<User> = {
    email: '',
    password: ''
  }

  message: string = '';
  constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.loggedIn$.subscribe(res => this.loggedIn = res);
  }

  login() {
    this.userService.login(this.user)
      .then((response: any) => {
        console.log(response.token)
        localStorage.setItem('id', (jwt_decode(response.token) as any).id);
        localStorage.setItem('token', response.token);
        this.loggedIn = true;
        this.loginService.changeStatus(true);
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        this.message = err.error.message;
      })
  }
}
