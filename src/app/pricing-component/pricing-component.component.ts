import { Component, OnInit } from '@angular/core';
import { PlanEnumValues } from '../constants';

enum PlansEnum {
  Free = 'Free',
  Pro = 'Pro',
  Interview = 'Interview',
}

@Component({
  selector: 'app-pricing-component',
  templateUrl: './pricing-component.component.html',
  styleUrls: ['./pricing-component.component.less']
})
export class PricingComponentComponent {

  /**
   * Prices are in subunits.
   */
  public readonly planPrice = {
    [PlanEnumValues.hour]: {
      INR: 2000,
      USD: 100,
    },
    [PlanEnumValues.day]: {
      INR: 5000,
      USD: 300,
    },
    [PlanEnumValues.interview]: {
      INR: 39900,
      USD: 500,
    },
    [PlanEnumValues.trail]: {
      INR: 0,
      USD: 0,
    },
  };

  public isIst: boolean;

  constructor() {
    const currentTime = new Date().toString().split(/[()]+/).filter(x => x)
    const standardTime = currentTime.length > 1 ? currentTime[1] : null
    this.isIst = standardTime === 'India Standard Time';
  }
}
