import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { UserProfileSideNavService } from '../app.services/userprofile-sidenav.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.less']
})
export class PlaygroundComponent implements AfterViewInit {
  @ViewChild('userprofile')
  public userprofileSideNav!: MatSidenav;

  public testuipageWidth!: number;

  public testuipageHeight!: number;

  @ViewChild('testuipageContainer')
  private testuipage!: MatDrawerContent;

  private userProfileSideNavService: UserProfileSideNavService;

  constructor(
    userProfileSideNavService: UserProfileSideNavService,
  ) {
    this.userProfileSideNavService = userProfileSideNavService;
  }

  ngAfterViewInit(): void {
    this.onResize();

    this.userProfileSideNavService.setSidenav(this.userprofileSideNav);
  }

  public onResize(): void {
    const { offsetWidth } = this.testuipage.getElementRef().nativeElement;
    const { offsetHeight } = this.testuipage.getElementRef().nativeElement;

    this.testuipageWidth = offsetWidth;
    this.testuipageHeight = offsetHeight;
  }
}
