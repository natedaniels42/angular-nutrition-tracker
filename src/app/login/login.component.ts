import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Partial<User> = {
    email: '',
    password: ''
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.user)
      .then((response: any) => {
        console.log(response.token)
        localStorage.setItem('id', (jwt_decode(response.token) as any).id);
        localStorage.setItem('token', response.token);  
      })
  }
}
