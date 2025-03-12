import { Component, OnInit, Renderer2, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PaymentService, IOrderNotes } from '../app.services/payment.service';
import { UserStateManagerService } from '../app.services/user-state-manager.service';
import { PlanEnumValues } from '../constants';

interface IOrderDetails {
  amount: number,
  currency: string,
  receipt: string,
  notes: IOrderNotes,
}

@Component({
  selector: 'app-payment-gateway-integration',
  templateUrl: './payment-gateway-integration.component.html',
  styleUrls: ['./payment-gateway-integration.component.less']
})
export class PaymentGatewayIntegrationComponent implements OnInit {
  @Input()
  public plan!: PlanEnumValues;

  @Input()
  public intervieweeEmail = '';

  /**
   * Prices are in subunits.
   */
  private readonly planPrice = {
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

  private isIst!: boolean;

  private readonly clientKey = 'rzp_live_JnriBQZ4WjPXp8';

  private orderDetails!: IOrderDetails;

  private placedOrder: any;

  private jsScript: any;

  public showProgressBar = false;

  constructor(
    private readonly _renderer2: Renderer2,
    @Inject(DOCUMENT)
    private readonly _document: Document,
    private readonly paymentService: PaymentService,
    private readonly userStateManagerService: UserStateManagerService,
  ) { }

  ngOnInit(): void {
    this.setIsIndianStandardTime();
    const currency = this.isIst ? 'INR' : 'USD';

    this.jsScript = this._renderer2.createElement('script');
    const planPrice = this.planPrice[this.plan][currency];

    let purpose = this.plan === PlanEnumValues.interview && `for interviewing ${this.intervieweeEmail}`;
    purpose = this.plan === PlanEnumValues.day && 'for a day';
    purpose = this.plan === PlanEnumValues.hour && 'for a hour';

    this.orderDetails = {
      amount: planPrice,
      currency: currency,
      receipt: `receipt__${this.userStateManagerService.userstate.userdata.useremail}`.slice(0, 40),
      notes: {
        description: `Order for ${this.userStateManagerService.userstate.userdata.useremail} on ${new Date().toUTCString()} ${purpose}`
      },
    }
  }

  private setIsIndianStandardTime() {
    const currentTime = new Date().toString().split(/[()]+/).filter(x => x)
    const standardTime = currentTime.length > 1 ? currentTime[1] : null
    this.isIst = standardTime === 'India Standard Time';
  }

  public placeOrder(): void {
    if (!this.plan) {
      return;
    }
    this.showProgressBar = true;
    this.paymentService.placeOrder(
      this.orderDetails.amount,
      this.orderDetails.currency,
      this.orderDetails.receipt,
      this.orderDetails.notes,
    ).subscribe(resp => {
      this.placedOrder = JSON.parse(resp);

      let description = this.plan === PlanEnumValues.hour && 'Happy Learning for one hour';
      description = this.plan === PlanEnumValues.day && 'Happy Learning for this Day'
      description = this.plan === PlanEnumValues.interview && 'Happy Recruiting';

      const {
        username,
        useremail,
        userid,
      } = this.userStateManagerService.userstate.userdata;

      // console.log(this.userStateManagerService.userstate.userdata, 'this.userStateManagerService.userstate.userdata;')

      this.jsScript.text = `
      var options = {
        "key": "${this.clientKey}",
        "amount": "${this.orderDetails.amount}",
        "currency": "${this.orderDetails.currency}",
        "order_id": "${this.placedOrder.id}",
        "name": "selenium.video",
        "description": "${description}",
        "image": "https://cdn.pixabay.com/photo/2017/02/24/03/12/texture-2093789_960_720.jpg",
        "handler": function (response) {
          localStorage.setItem("paymentSuccess", JSON.stringify(response));
          document.getElementById("subs-trans").click()
        },
        "prefill": {
          "name": "${username}",
          "email": "${useremail}",
          "contact": ""
        },
        "notes": {
          "description": "Order for ${useremail} on ${new Date().toUTCString()}"
        },
        "theme": {
          "color": "#000000"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        localStorage.setItem("paymentFailure", JSON.stringify(response));
        alert("PAYMENT FAILED: " + JSON.stringify(response));
      });
      document.getElementById('rzp-button2').onclick = function (e) {
        rzp1.open();
        e.preventDefault();
      }`;

      // console.log(this.jsScript)

      this.jsScript.id = `${this.plan}-script`;
      this._renderer2.appendChild(this._document.body, this.jsScript);
    });
  }

  public get isOrderCreated() {
    return Boolean(this.placedOrder);
  }

  public showPaymentButtonText(): string {
    const buttonText = this.isOrderCreated ? 'Checkout Price' : 'Subscribe';

    return buttonText;
  }

  public isDisabled(): boolean {
    const allTokenTypes = this.userStateManagerService.getAllTokenTypes();

    return allTokenTypes.includes(this.plan) && this.plan !== PlanEnumValues.interview;
  }
}
