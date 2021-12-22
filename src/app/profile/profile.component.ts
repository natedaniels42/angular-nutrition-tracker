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
  breakfast: Food[] = [];
  lunch: Food[] = [];
  dinner: Food[] = [];
  snack: Food[] = [];

  constructor(private userService: UserService, private foodService: FoodService) { }

  changeDate($event: Event): void {
    this.date = new Date(($event.target as HTMLInputElement).value).toUTCString().split(' ').slice(0, 4).join(' ');
    this.changeMeals();
  }

  search(value: string): void {
    this.foodService.searchFood(value)
      .then((response: any) => {
        this.foods = response.common.map((food: any) => {
          return {name: food.food_name, image: food.photo.thumb};
        }).concat(response.branded.map((food: any) => {
          return {name: food.food_name, image: food.photo.thumb};
        }))
        
      })
  }

  getFood(value: string): void {
    this.foodService.getFood(value)
      .then((response: any) => {
        console.log(response);
        this.food.name = response.foods[0].food_name;
        this.food.calories = Math.round(response.foods[0].nf_calories);
        this.food.carbs = Math.round(response.foods[0].nf_total_carbohydrate);
        this.food.fat = Math.round(response.foods[0].nf_total_fat);
        this.food.protein = Math.round(response.foods[0].nf_protein);
        this.food.image = response.foods[0].photo.thumb;
      })
  }

  handleSubmit(meal: string): void {
    this.food.date = this.date;
    this.food.meal = meal;
    this.userService.addFood(localStorage.getItem('id') as string, this.food)
      .then((response: any) => {
        console.log(response);
        this.foods = [];
        this.food = {date: this.date,
          meal: '',
          name: '',
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          image: ''};
          this.changeMeals();
      })
  }

  changeMeals() {
    this.breakfast = this.user.food.filter(item => item.date === this.date && item.meal === 'breakfast');
    this.lunch = this.user.food.filter(item => item.date === this.date && item.meal === 'lunch');
    this.dinner = this.user.food.filter(item => item.date === this.date && item.meal === 'dinner');
    this.snack = this.user.food.filter(item => item.date === this.date && item.meal === 'snack');
  }
  
  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('id') as string)
          .then((response: any) => {
            this.user = response;
            console.log(this.user);
            this.changeMeals();
          })
  }

}
