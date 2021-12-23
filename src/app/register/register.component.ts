import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../user';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    dailyCalorieGoal: 0,
    dailyCarbGoal: 0,
    dailyFatGoal: 0,
    dailyProteinGoal: 0,
    food: []}
  message: string = '';
  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    console.log(this.user)
    this.userService.createUser(this.user)
      .then((response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.message = err.error.message;
      }) 
  }
}
