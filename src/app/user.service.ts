import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private deployedUrl: string = 'https://nutrition-tracker-api42.herokuapp.com/api/v1';
  private localUrl: string = 'http://localhost:4000/api/v1';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json') 

  constructor(private http: HttpClient) { }

  public getUser(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.deployedUrl}/user/${id}`).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
  
  public createUser(data: User) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.deployedUrl}/auth/register`, data).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        })
    }) 
  }

  public login(data: Partial<User>) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.deployedUrl}/auth/login`, data).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }

  public addFood(id: string, food: Food) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.deployedUrl}/user/${id}/addfood`, food, {headers: this.headers}).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }

  public removeFood(id: string, food: Food) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.deployedUrl}/user/${id}/removefood`, food, {headers: this.headers}).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
}
