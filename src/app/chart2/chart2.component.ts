import { Component, Input, OnChanges } from '@angular/core';
import { Chart2 } from '../chart2';

@Component({
  selector: 'chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnChanges {
  @Input() totalCalories: number = 0;
  @Input() totalCarbs: number = 0;
  @Input() totalFat: number = 0;
  @Input() totalProtein: number = 0;
  @Input() dailyCalorieGoal: number = 0;
  @Input() dailyCarbGoal: number = 0;
  @Input() dailyFatGoal: number = 0;
  @Input() dailyProteinGoal: number = 0;
  chart2: Chart2 = {
    data: [
      {
        x: ['calories', 'carbs', 'fat', 'protein'],
        y: [this.totalCalories, this.totalCarbs, this.totalFat, this.totalProtein],
        name: 'Daily Totals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['lightgrey'],
          opacity: 0.7
        }
      },
      {
        x: ['calories', 'carbs', 'fat', 'protein'],
        y: [this.dailyCalorieGoal, this.dailyCarbGoal, this.dailyFatGoal, this.dailyProteinGoal],
        name: 'Daily Goals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['grey'],
          opacity: 0.7
        }
      }
    ],
    layout: {
      title: 'Nutrition Data vs goals',
      barmode: 'group',
      width: 500,
      height: 500,
      legend: {
        x: 0,
        y: 0,
        orientation: 'h',
        bgcolor: '#eee'
      },
      xaxis: {
        tickangle: -45
      },
      yaxis: {
        title: ''
      },
    }
  }
  constructor() { }

  ngOnChanges(): void {
    if (this.totalCalories !== 0) {
      this.chart2.data[0].y = [this.totalCalories, this.totalCarbs, this.totalFat, this.totalProtein];
      this.chart2.data[1].y = [this.dailyCalorieGoal, this.dailyCarbGoal, this.dailyFatGoal, this.dailyProteinGoal];
    }
  }

}
