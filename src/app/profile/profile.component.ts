import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    dailyCalorieGoal: 0,
    dailyCarbGoal: 0,
    dailyFatGoal: 0,
    dailyProteinGoal: 0,
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
  breakfastCalories: number = 0;
  lunchCalories: number = 0;
  dinnerCalories: number = 0;
  snackCalories: number = 0;
  totalNutrients: number = 0;
  totalCalories: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  totalProtein: number = 0;
  carbPercentage: number = 0;
  fatPercentage: number = 0;
  proteinPercentage: number = 0;

  constructor(private router: Router, private userService: UserService, private foodService: FoodService) { }

  changeDate($event: Event): void {
    this.date = new Date(($event.target as HTMLInputElement).value).toUTCString().split(' ').slice(0, 4).join(' ');
    this.changeMeals(this.user);
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
        console.log(this.food);
      })
  }

  async handleSubmit(meal: string): Promise<void> {
    this.food.date = this.date;
    this.food.meal = meal;
    const updatedUser: User = await this.userService.addFood(localStorage.getItem('id') as string, this.food) as User
    this.foods = [];
    this.food = {
      date: this.date,
      meal: '',
      name: '',
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
      image: '',
    };

    console.log(updatedUser);
    this.changeMeals(updatedUser);
  }

  async handleDelete(food: Food): Promise<void> {
    const updatedUser: User = await this.userService.removeFood(localStorage.getItem('id') as string, food) as User;
    this.changeMeals(updatedUser);
  }

  handleDetail(food: Food) {
    localStorage.setItem('food', JSON.stringify(food));
    this.router.navigate([`food-detail/${food.name}`]);
  }

  changeMeals(user: User) {
    this.breakfast = user.food.filter(item => item.date === this.date && item.meal === 'breakfast');
    this.lunch = user.food.filter(item => item.date === this.date && item.meal === 'lunch');
    this.dinner = user.food.filter(item => item.date === this.date && item.meal === 'dinner');
    this.snack = user.food.filter(item => item.date === this.date && item.meal === 'snack');
    this.breakfastCalories = this.breakfast.reduce((a,c) => a + c.calories, 0);
    this.lunchCalories = this.lunch.reduce((a,c) => a + c.calories, 0);
    this.dinnerCalories = this.dinner.reduce((a,c) => a + c.calories, 0);
    this.snackCalories = this.snack.reduce((a,c) => a + c.calories, 0);
    this.totalCalories = this.breakfastCalories + this.lunchCalories + this.dinnerCalories + this.snackCalories;
    this.totalCarbs = user.food.filter(item => item.date === this.date).reduce((a,c) => a + c.carbs, 0);
    this.totalFat = user.food.filter(item => item.date === this.date).reduce((a,c) => a + c.fat, 0);
    this.totalProtein = user.food.filter(item => item.date === this.date).reduce((a,c) => a + c.protein, 0);
    this.totalNutrients = this.totalCarbs + this.totalFat + this.totalProtein;
    this.carbPercentage = Math.round(this.totalCarbs / this.totalNutrients * 100);
    this.fatPercentage = Math.round(this.totalFat / this.totalNutrients * 100);
    this.proteinPercentage = Math.round(this.totalProtein / this.totalNutrients * 100);
  }
  
  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('id') as string)
      .then((response: any) => {
        this.user = response;
        console.log(this.user);
        this.changeMeals(this.user);
      })
  }
}
