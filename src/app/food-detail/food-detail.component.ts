import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Food } from '../food';

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
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.food = JSON.parse(localStorage['food'])
    console.log(this.food);
  }

}
