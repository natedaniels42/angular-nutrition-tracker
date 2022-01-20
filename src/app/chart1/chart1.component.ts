import { Component, Input, OnChanges } from '@angular/core';
import { Chart1 } from '../chart1';

@Component({
  selector: 'chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnChanges {
  @Input() carbs: number = 0;
  @Input() fat: number = 0;
  @Input() protein: number = 0;
  totalNutrients: number = 0;
  chart1: Chart1 = {
    data: [{
      values: [this.carbs, this.fat , this.protein],
      labels: ['Carbs', 'Fat', 'Protein'],
      type: 'pie',
      marker: {
        colors: ['rgba(107, 107, 245, .2)', 'rgba(250, 76, 76, .2)', 'rgba(56, 250, 56, .2)']
      }
    }],
    layout: {
      title: 'Macronutrient Ratios',
      paper_bgcolor: '#eee',
      plot_bgcolor: '#eee',
      legend: {
        x: 0,
        y: 0,
        orientation: 'h',
        bgcolor: 'rgba(240, 240, 240, .5)'
      },
    },
    config: {
      responsive: true,
      displayModeBar: false
    }
  }
  
  constructor() { }

  ngOnChanges(): void {
    if (this.carbs !== 0 || this.fat !== 0 || this.protein !== 0) {
      this.chart1.data[0].values = [this.carbs, this.fat, this.protein];
    }
  }

}
