import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaygroundComponent } from './playground/playground.component';
import { TestuipageComponent, TestuipageModal } from './testuipage/testuipage.component';
import { VirtualUITestsConfigService } from './app.services/virtual-ui-tests.config.service';
import { TestCaseCodePostManService } from './app.services/testcase-code-postman.service';
import { TopheaderComponent } from './topheader/topheader.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { UserLoginService } from './app.services/userlogin.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserModeCardComponent } from './user-mode-card/user-mode-card.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { UserProfileSideNavService } from './app.services/userprofile-sidenav.service';
import { SetVideoPlayerService } from './app.services/set-video-player.service';
import { UserStateManagerService } from './app.services/user-state-manager.service';
import { NotificationService } from './app.services/notification.service';
import { TokenManagerService } from './app.services/token-manager.service';
import { PaymentService } from './app.services/payment.service';
import { AppRoutingModule } from './app-routing.module';
import { DynamicDialogComponentComponent } from './dynamic-dialog-component/dynamic-dialog-component.component';
import { DialogService } from './app.services/dialog.service';
import { GlobalStateStore } from './app.services/globalstate.store';
import { AboutUsComponentComponent } from './about-us-component/about-us-component.component';
import { TermsAndConditionsComponentComponent } from './terms-and-conditions-component/terms-and-conditions-component.component';
import { PrivacyPolicyComponentComponent } from './privacy-policy-component/privacy-policy-component.component';
import { PricingComponentComponent } from './pricing-component/pricing-component.component';
import { TestuipageMiscComponent } from './testuipage-misc/testuipage-misc.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    TestuipageComponent,
    TestuipageModal,
    TopheaderComponent,
    VideoplayerComponent,
    LoginButtonComponent,
    UserProfileComponent,
    UserModeCardComponent,
    DynamicDialogComponentComponent,
    AboutUsComponentComponent,
    TermsAndConditionsComponentComponent,
    PrivacyPolicyComponentComponent,
    PricingComponentComponent,
    TestuipageMiscComponent,
    FaqSectionComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    VirtualUITestsConfigService,
    TestCaseCodePostManService,
    UserLoginService,
    UserProfileSideNavService,
    SetVideoPlayerService,
    UserStateManagerService,
    NotificationService,
    TokenManagerService,
    PaymentService,
    DialogService,
    GlobalStateStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
