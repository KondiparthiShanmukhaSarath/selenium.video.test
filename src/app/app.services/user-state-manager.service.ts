import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileSideNavService } from "./userprofile-sidenav.service";
import { NotificationService } from "./notification.service";
import { TokenManagerService } from "./token-manager.service";

interface IUserState {
    userdata: {
        authtoken?: string,
        userid?: string,
        username?: string,
        imageurl?: string,
        useremail?: string,
        userloggedinstatus: boolean,
        lastLogIn?: Date,
        trial_token?: string,
        interview_token?: string,
    },
    tokenData: ITokens[],
    activemode: boolean | string,
}

export interface ITokens {
    tokentype: string;
    token: string;
    timeremaining: string;
    status: boolean;
}

const emptyToken: ITokens = {
    tokentype: '',
    token: '',
    timeremaining: '',
    status: false,
};

@Injectable({
    providedIn: "root",
})
export class UserStateManagerService {
    public userstate!: IUserState;

    constructor(
        private userProfileSideNavService: UserProfileSideNavService,
        private notificationService: NotificationService,
        private tokenManagerService: TokenManagerService,
    ) {
        this.initializeUserState();
    }

    public setUserData(
        authtoken: string,
        userid: string,
        username: string,
        imageurl: string,
        useremail: string,
        userloggedinstatus: boolean,
        lastLogIn: Date,
    ) {
        this.userstate.userdata = {
            authtoken: authtoken,
            userid: userid,
            username: username,
            imageurl: imageurl,
            useremail: useremail,
            userloggedinstatus: userloggedinstatus,
            lastLogIn: lastLogIn,
        }
    }

    private getBackendState(): Observable<string> {
        return this.tokenManagerService.getTokenDetails(this.userstate.userdata.useremail);
    }

    public setBackendStateIntoUI(): void {
        this.getBackendState().subscribe(
            (data: string) => {
                const responseData: any = JSON.parse(data);
                const tokenDataKeys = Object.keys(responseData);
                this.userstate.tokenData.length = 0; // flush all the tokens before updating
                tokenDataKeys.map((key: string) => {
                    const token = { ...emptyToken }

                    token.tokentype = key.split('__')[1];
                    [
                        token.token,
                        token.timeremaining
                    ] = responseData[key].split(' expires at: ');

                    this.userstate.tokenData.push(token);
                });
                this.setDefaultActiveToken();
                this.generateTrailUserTokenOnLogin();
            },
            (error: HttpErrorResponse) => {
                // console.log(error, 'ERROR');
                if (error.status === 404) {
                    this.userProfileSideNavService.open();
                    this.notificationService.showSnackBar("Select one of the Plans Available");
                    // console.log(this.userstate, "USERSTATE");
                }
            },
        );
    }

    public setStateOnSignIn() {
        this.setBackendStateIntoUI();
    }

    private setDefaultActiveToken(): void {
        const allAvailableTokenTypes = this.userstate.tokenData.map(token => token.tokentype);
        this.userstate.activemode = allAvailableTokenTypes.sort()[0] || false;
        this.userstate.tokenData.map(token => {
            token.status = token.tokentype === this.userstate.activemode;
        });
        // console.log('USER state set to', this.userstate.activemode, 'from all', allAvailableTokenTypes);
        // console.log(this.userstate, "USERSTATE");
    }

    private generateTrailUserTokenOnLogin(): void {
        if (!this.userstate.tokenData.length && this.isRecentLogin()) {
            // console.log('generating, on Signin', this.userstate);
            const { useremail } = this.userstate.userdata;
            const devToken = this.tokenManagerService.generateDevToken('trail', useremail);

            devToken.subscribe(
                (data: string) => {
                    const responseData: any = JSON.parse(data);
                    // console.log(responseData, "TOKENDATA");
                    this.setBackendStateIntoUI();
                    // console.log('New Token generated, on Signin', this.userstate.tokenData.length)
                },
            );
        }
    }

    public setStateOnSignOut() {
        this.initializeUserState();
    }

    private isRecentLogin(): boolean {
        const currentTime = new Date().valueOf();
        const loginTime = this.userstate.userdata.lastLogIn?.valueOf() || 0;

        const deltaTime = currentTime - loginTime;
        // console.log('deltaTime < 6000', deltaTime < 6000, deltaTime);
        return deltaTime < 6000;
    }

    private initializeUserState() {
        this.userstate = {
            userdata: {
                userloggedinstatus: false,
            },
            tokenData: [],
            activemode: false,
        }
    }

    public getAllTokenTypes(): string[] {
        return this.userstate.tokenData.map(token => token.tokentype);
    }
}