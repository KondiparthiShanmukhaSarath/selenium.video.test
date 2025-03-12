import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../app.services/userlogin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  public userLoginService!: UserLoginService;

  constructor(userLoginService: UserLoginService) {
    this.userLoginService = userLoginService;
  }

  ngOnInit(): void {}

  public initiateLogout() {
    this.userLoginService.signOut();
  }
}
