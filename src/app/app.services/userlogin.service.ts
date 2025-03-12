import { Injectable } from "@angular/core";
import { UserStateManagerService } from "./user-state-manager.service";

@Injectable({
    providedIn: "root",
})
export class UserLoginService {
    public username!: string;
    public imageURL!: string;
    public useremail!: string;
    private isUserLoggedIn!: boolean;
    private authToken!: string;
    private userID!: string;
    private gapi: any;
    private lastLogIn!: Date;

    constructor(private userStateManagerService: UserStateManagerService) { }

    public onSignIn(
        authToken: string,
        userID: string,
        username: string,
        imageURL: string,
        useremail: string,
        gapi: any,
    ): void {
        this.isUserLoggedIn = true;
        this.authToken = authToken;
        this.userID = userID;
        this.username = username;
        this.imageURL = imageURL;
        this.useremail = useremail;
        this.gapi = gapi;
        this.lastLogIn = new Date();

        this.userStateManagerService.setUserData(
            this.authToken,
            this.userID,
            this.username,
            this.imageURL,
            this.useremail,
            this.isUserLoggedIn,
            this.lastLogIn,
        );

        this.userStateManagerService.setStateOnSignIn()
    }

    public onSignOut(): void {
        this.isUserLoggedIn = false;
        this.userStateManagerService.setStateOnSignOut();
        window.location.reload();
    }

    public getAuthToken(): string | null {
        return this.isUserLoggedIn ? this.authToken : null;
    }

    public getUserID(): string | null {
        return this.isUserLoggedIn ? this.userID : null;
    }

    public getUsername(): string | null {
        return this.isUserLoggedIn ? this.username : null;
    }

    public getImageURL(): string | null {
        return this.isUserLoggedIn ? this.imageURL : null;
    }

    public getUserEmail(): string | null {
        return this.isUserLoggedIn ? this.useremail : null;
    }

    public getUserLoggedStatus(): boolean {
        return this.isUserLoggedIn;
    }

    public signOut(): void {
        const auth2 = this.gapi.auth2.getAuthInstance();
        auth2.signOut().then(
            () => {
                // console.log("User Logged Out");
                this.onSignOut();
            }
        );
    }
}