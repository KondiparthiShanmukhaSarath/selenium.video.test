import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from '../app.services/dialog.service';
import { PaymentService } from '../app.services/payment.service';
import { TokenManagerService } from '../app.services/token-manager.service';
import { ITokens, UserStateManagerService } from '../app.services/user-state-manager.service';
import { PlanEnumValues } from '../constants';

@Component({
  selector: 'app-all-tokens-table',
  templateUrl: './all-tokens-table.component.html',
  styleUrls: ['./all-tokens-table.component.less']
})
export class AllTokensTableComponent implements OnInit {
  public planEnumValues = {
    [PlanEnumValues.day]: PlanEnumValues.day,
    [PlanEnumValues.hour]: PlanEnumValues.hour,
    [PlanEnumValues.trail]: PlanEnumValues.trail,
    [PlanEnumValues.interview]: PlanEnumValues.interview,
  }

  public get allTokens(): ITokens[] {
    return [...this.userStateManagerService.userstate.tokenData];
  }

  public displayedColumns = ['tokentype', 'timeremaining', 'status'];

  public get activeMode(): boolean {
    return Boolean(this.userStateManagerService.userstate.activemode);
  }

  constructor(
    private readonly tokenManagerService: TokenManagerService,
    private readonly userStateManagerService: UserStateManagerService,
    private readonly paymentService: PaymentService,
    private readonly dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    // console.log(this.userStateManagerService.userstate, 'USERSTATE');
  }

  public setActiveToken(row: ITokens): void {
    this.allTokens.forEach((token) => {
      token.status = token.token === row.token ? true : false
    });
    this.userStateManagerService.userstate.activemode = row.tokentype;
    // console.log(row, "ROW", this.userStateManagerService.userstate);
  }

  public email = new FormControl('', [Validators.required, Validators.email]);

  public getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public devTokenTypeSelected: PlanEnumValues = PlanEnumValues.trail;

  public generateDevToken(): void {
    const { useremail: emailid } = this.userStateManagerService.userstate.userdata
    const devToken = this.tokenManagerService.generateDevToken(this.devTokenTypeSelected, emailid);
    devToken.subscribe(
      (data: string) => {
        const responseData: any = JSON.parse(data);
        // console.log(responseData, "TOKENDATA");
        this.userStateManagerService.setBackendStateIntoUI();
      },
    );
    // console.log(this.devTokenTypeSelected, "DEVTOKEN", devToken);
    this.dialogService.openDialog();
  }

  public intervieweeEmail!: string;

  public refreshTable(): void {
    this.userStateManagerService.setBackendStateIntoUI();
  }

  public getTimeRemaining(customtime: string): string {
    const date = new Date();
    const dateParamsNum = customtime.split(/[^0-9]/g).map(num => parseInt(num));
    const customTimeInUtc = Date.UTC(dateParamsNum[0], dateParamsNum[1] - 1, dateParamsNum[2], dateParamsNum[3], dateParamsNum[4], dateParamsNum[5]);
    const currentTimeInUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    let delta = customTimeInUtc - currentTimeInUtc;

    if (delta < 0) {
      this.userStateManagerService.setBackendStateIntoUI();
      delta = 0;
    }

    const deltaTime = new Date(delta);
    const startTime = new Date(0);

    const days = deltaTime.getUTCDate() - startTime.getUTCDate();
    const hours = deltaTime.getUTCHours() - startTime.getUTCHours();
    const minutes = deltaTime.getUTCMinutes() - startTime.getUTCMinutes();

    const daysRemaining = days ? `${days} Days,` : '';
    const hoursRemaining = hours ? `${hours} Hours,` : '';
    const minutesRemaining = minutes ? `${minutes} Mins` : '';

    const timeRemaining = daysRemaining + hoursRemaining + minutesRemaining;

    return timeRemaining || 'Few seconds...';
  }

  public authenticateTransaction(): void {
    const paymentSuccessData = JSON.parse(localStorage.getItem('paymentSuccess') || '{}');
    if (!Object.keys(paymentSuccessData).length) {
      return;
    }

    const subscriptions = {
      hour: 'hour1',
      day: 'day1',
      interview: '',
    };

    let subscription: string;

    if (this.devTokenTypeSelected === PlanEnumValues.day) {
      subscription = subscriptions.day;
    }

    else if (this.devTokenTypeSelected === PlanEnumValues.hour) {
      subscription = subscriptions.hour;
    }

    else {
      subscription = subscriptions.interview;
    }

    const devTokenType = this.devTokenTypeSelected === PlanEnumValues.interview ? 'interviewtoken' : 'devtoken';

    const useremail = this.devTokenTypeSelected === PlanEnumValues.interview
      ? this.intervieweeEmail
      : this.userStateManagerService.userstate.userdata.useremail || 'usernotlogged';

    this.paymentService.authenticateTransaction(
      paymentSuccessData.razorpay_payment_id,
      paymentSuccessData.razorpay_order_id,
      paymentSuccessData.razorpay_signature,
      devTokenType,
      useremail,
      subscription,
    ).subscribe();

    setTimeout(() => {
      localStorage.removeItem('paymentSuccess');
    }, 60000);

    this.refreshTable();
  }

  public isTrailTokenAvailable(): boolean {
    const allTokenTypes = this.userStateManagerService.getAllTokenTypes();

    return allTokenTypes.includes('mins');
  }
}
