import { Component, Input, OnChanges } from '@angular/core';
import { Chart2 } from '../chart2';

@Component({
  selector: 'chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnChanges {
  @Input() totalCalories: number = 0;
  @Input() dailyCalorieGoal: number = 0;

  chart2: Chart2 = {
    data: [
      {
        x: ['calories'],
        y: [this.totalCalories],
        name: 'Daily Totals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['rgb(250, 205, 123)'],
          opacity: 0.7
        }
      },
      {
        x: ['calories'],
        y: [this.dailyCalorieGoal],
        name: 'Daily Goals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['rgb(255, 181, 44)'],
          opacity: 0.7
        }
      }
    ],
    layout: {
      title: '',
      barmode: 'group',
      paper_bgcolor: '#eee',
      plot_bgcolor: '#eee',
      legend: {
        x: .5,
        y: 1.2,
        orientation: 'h',
        bgcolor: 'rgba(240, 240, 240, .5)'
      },
      xaxis: {
        tickangle: -45
      },
      yaxis: {
        title: 'Calories (kCal)'
      },
    },
    config: {
      responsive: true,
      displayModeBar: false
    }
  }
  constructor() { }

  ngOnChanges(): void {
    if (this.totalCalories !== 0) {
      this.chart2.data[0].y = [this.totalCalories];
      this.chart2.data[1].y = [this.dailyCalorieGoal];
    }
  }

}
