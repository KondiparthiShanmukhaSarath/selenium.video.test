import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from '../app.services/dialog.service';
import { UserStateManagerService } from '../app.services/user-state-manager.service';
import { UserLoginService } from '../app.services/userlogin.service';
import { UserProfileSideNavService } from '../app.services/userprofile-sidenav.service';
import { modalTab } from '../dynamic-dialog-component/dynamic-dialog-component.component';

declare const gapi: any;

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.less']
})
export class LoginButtonComponent implements OnInit {
  public auth2: any;

  public userLoginService: UserLoginService;

  public imageURL!: string | null;

  public username!: string | null;

  public isUserLoggedIn = false;

  public get activeMode(): boolean {
    return Boolean(this.userStateManagerService.userstate.activemode);
  }

  @Output()
  public sidenavToggle = new EventEmitter<void>();

  private userProfileSideNavService: UserProfileSideNavService;

  constructor(
    userLoginService: UserLoginService,
    userProfileSideNavService: UserProfileSideNavService,
    private readonly userStateManagerService: UserStateManagerService,
    private readonly dialogService: DialogService,
  ) {
    this.userLoginService = userLoginService;
    this.userProfileSideNavService = userProfileSideNavService;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  public onLoginAttempt() {
    this.dialogService.openDialog(modalTab.loginsuccess);
  }

  public googleInit() {
    // console.log("GG+OOGLEUSER");
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '340091650755-ed0dkgk1v8gom6emtun814ckss6scq35.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('login-btn'));
    });
  }

  public attachSignin(element: HTMLElement | null) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        let profile = googleUser.getBasicProfile();

        const authToken = googleUser.getAuthResponse().id_token;
        const userID = profile.getId();
        const username = profile.getName();
        const imageURL = profile.getImageUrl();
        const useremail = profile.getEmail();

        this.userLoginService.onSignIn(authToken, userID, username, imageURL, useremail, gapi)

        this.imageURL = this.userLoginService.getImageURL();
        this.username = this.userLoginService.getUsername();
        this.isUserLoggedIn = this.userLoginService.getUserLoggedStatus();

      }, (error: any) => {
        // console.log(JSON.stringify(error, undefined, 2));
      });
  }

  public openUserProfileSideNav() {
    this.userProfileSideNavService.toggle();
  }

  // Make sure that, this is the same Email ID used in selenium.video
}
