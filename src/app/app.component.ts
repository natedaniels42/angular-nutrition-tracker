import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-nutrition-tracker';
  loggedIn: boolean = false;
  constructor(private router: Router) {};

  onClick() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  ngOnInit() {
    localStorage['token'] ? this.loggedIn = true : this.loggedIn = false;
  }
}
