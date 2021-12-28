import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Food } from '../food';
import { User } from '../user'; 
import { UserService } from '../user.service';

@Component({
  selector: 'food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  food: Food = {
    date: '',
    meal: '',
    name: '',
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    image: '',
  }

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

  percentages: {calories: number, carbs: number, fat: number, protein: number} = {
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0
  };
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.food = JSON.parse(localStorage['food'])
    this.user = await this.userService.getUser(localStorage.getItem('id') as string) as User;
    this.percentages = {
      calories: Math.round(this.food.calories / this.user.dailyCalorieGoal * 100),
      carbs: Math.round(this.food.carbs / this.user.dailyCarbGoal * 100),
      fat: Math.round(this.food.fat / this.user.dailyFatGoal * 100),
      protein: Math.round(this.food.protein / this.user.dailyProteinGoal * 100)
    }
  }

}
