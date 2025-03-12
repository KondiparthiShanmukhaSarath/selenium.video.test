import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export enum modalTab {
  ads = 0,
  aboutus = 1,
  faqs = 2,
  tandc = 3,
  privacy = 4,
  pricing = 5,
  loginsuccess = 6,
}

@Component({
  selector: 'app-dynamic-dialog-component',
  templateUrl: './dynamic-dialog-component.component.html',
  styleUrls: ['./dynamic-dialog-component.component.less']
})
export class DynamicDialogComponentComponent implements OnInit {
  public actionsDisabled: boolean = false;

  public activeTab!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tabname: modalTab; },
    private router: Router
  ) {
    this.activeTab = data.tabname;
  }

  public ngOnInit(): void {
    this.disableCloseButtonOnAds();
  }

  public onTabSwitch(): void {
    this.disableCloseButtonOnAds();
    switch (this.activeTab) {
      case modalTab.aboutus:
        this.router.navigateByUrl('/home');
        break;
      case modalTab.tandc:
        this.router.navigateByUrl('/terms-and-conditions');
        break;
      case modalTab.privacy:
        this.router.navigateByUrl('/privacy-policy');
        break;
      case modalTab.pricing:
        this.router.navigateByUrl('/pricing');
        break;
      case modalTab.ads:
        this.router.navigateByUrl('/ads');
        break;
      case modalTab.faqs:
        this.router.navigateByUrl('/faqs');
        break;
      case modalTab.loginsuccess:
        this.router.navigateByUrl('/loginsuccess');
        break;
    }
  }

  public disableCloseButtonOnAds(): void {
    if (this.activeTab === modalTab.ads && !this.actionsDisabled) {
      this.actionsDisabled = true;

      setTimeout(() => (this.actionsDisabled = false), 7000);
    }
  }
}
