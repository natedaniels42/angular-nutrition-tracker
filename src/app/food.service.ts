import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  headers = new HttpHeaders()
    .set('x-app-id', '0deeb5e4')
    .set('x-app-key', '9881f4db6c01d76c2bf3ac1a904d18c1')
    .set('x-remote-user-id', '0')
  constructor(private http: HttpClient) { }

  public searchFood(value: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, {headers: this.headers}).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }

  public getFood(value: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {query: value}, {headers: this.headers}).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
}
