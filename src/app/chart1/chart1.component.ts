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
      type: 'pie'
    }],
    layout: {
      height: 300,
      width: 300
    }
  }
  
  constructor() { }

  ngOnChanges(): void {
    if (this.carbs !== 0 || this.fat !== 0 || this.protein !== 0) {
      this.chart1.data[0].values = [this.carbs, this.fat, this.protein];
    }
  }

}
