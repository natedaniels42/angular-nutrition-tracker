import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor() { }

  changeStatus(status: boolean) {
    this.loggedIn.next(status);
  }
}
