import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:4000/api/v1'
  constructor(private http: HttpClient) { }

  public createUser(data: User) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/auth/register`, data).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err)
        })
    }) 
  }

  public login(data: Partial<User>) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/auth/login`, data).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
}
