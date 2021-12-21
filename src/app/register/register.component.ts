import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { User } from '../user';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User('','','');
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.userService.createUser(this.user)
      .then((response) => console.log(response))
  }
}
