import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Nutrition Tracker';
  loggedIn: boolean = false;
  expand: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {};

  toggle() {
    this.expand ? this.expand = false : this.expand = true;
  }

  onClick() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  ngOnInit() {
    if (localStorage.getItem('id')) {
      this.loggedIn = true;
    } else {
      this.loginService.loggedIn$.subscribe(res => this.loggedIn = res); 
    }
  }
}
