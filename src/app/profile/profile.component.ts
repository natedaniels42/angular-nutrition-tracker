import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Food } from '../food';
import { UserService } from '../user.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    food: []
  }
  date: string = new Date().toUTCString().split(' ').slice(0, 4).join(' ');
  foods: {name: string, image: string}[] = [];
  food: Food = {
    date: this.date,
    meal: '',
    name: '',
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    image: ''
  }
  
  constructor(private userService: UserService, private foodService: FoodService) { }

  changeDate($event: Event): void {
    this.date = new Date(($event.target as HTMLInputElement).value).toUTCString().split(' ').slice(0, 4).join(' ');
  }

  search(value: string) {
    this.foodService.searchFood(value)
      .then((response: any) => {
        this.foods = response.common.map((food: any) => {
          return {name: food.food_name, image: food.photo.thumb};
        }).concat(response.branded.map((food: any) => {
          return {name: food.food_name, image: food.photo.thumb};
        }))
        
      })
  }

  getFood(value: string) {
    this.foodService.getFood(value)
      .then((response) => console.log(response))
  }
  
  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('id') as string)
          .then((response: any) => {
            this.user = response;
            console.log(this.user);
          })
  }

}
