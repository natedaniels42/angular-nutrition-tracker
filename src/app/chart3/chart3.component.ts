import { Component, Input, OnChanges } from '@angular/core';
import { Chart2 } from '../chart2';

@Component({
  selector: 'chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnChanges {
  @Input() totalCarbs: number = 0;
  @Input() totalFat: number = 0;
  @Input() totalProtein: number = 0;
  @Input() dailyCarbGoal: number = 0;
  @Input() dailyFatGoal: number = 0;
  @Input() dailyProteinGoal: number = 0;
  chart3: Chart2 = {
    data: [
      {
        x: ['carbs', 'fat', 'protein'],
        y: [this.totalCarbs, this.totalFat, this.totalProtein],
        name: 'Daily Totals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['linear-gradient(rgb(206, 206, 255), rgb(0,0,0))', 'rgb(248, 132, 132)', 'rgb(139, 248, 139)'],
          opacity: 0.7
        }
      },
      {
        x: ['carbs', 'fat', 'protein'],
        y: [this.dailyCarbGoal, this.dailyFatGoal, this.dailyProteinGoal],
        name: 'Daily Goals',
        type: 'bar',
        orientation: 'v',
        legendgroup: 'group',
        mode: 'markers',
        marker: {
          color: ['rgb(107, 107, 245)', 'rgb(250, 76, 76)', 'rgb(56, 250, 56)'],
          opacity: 0.7
        }
      }
    ],
    layout: {
      title: '',
      barmode: 'group',
      legend: {
        x: .5,
        y: 1,
        orientation: 'h',
        bgcolor: 'rgba(240, 240, 240, .5)'
      },
      xaxis: {
        tickangle: -45
      },
      yaxis: {
        title: 'grams'
      },
    },
    config: {
      responsive: true,
      displayModeBar: false
    }
  }
  constructor() { }

  ngOnChanges(): void {
    if (this.totalCarbs !== 0 || this.totalFat !== 0 || this.totalProtein !== 0) {
      this.chart3.data[0].y = [this.totalCarbs, this.totalFat, this.totalProtein];
      this.chart3.data[1].y = [this.dailyCarbGoal, this.dailyFatGoal, this.dailyProteinGoal];
    }
  }

}
