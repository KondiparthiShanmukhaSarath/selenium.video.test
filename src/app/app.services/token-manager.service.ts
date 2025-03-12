import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { userDataUrl } from './api-endpoints';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: "root",
})
export class TokenManagerService {
    constructor (private http: HttpClient) {}

    public getTokenDetails(emailid?: string): Observable<string> {
        const postTokenData = {
            token: "all_tokens",
            tokentype: "interviewtoken",
            emailid,
        };

        return this.http.post<string>(
            userDataUrl,
            postTokenData,
            httpOptions,
        );
    }

    public generateDevToken(devTokenType: string, emailid?: string): Observable<string> {
        const minsArray = [
            'mins10', 'mins10', 'mins10', 'mins10', 'mins10', 'mins10', 'mins10', 'mins10',
            'mins15', 'mins15', 'mins15', 'mins15',
            'mins20',
        ];

        const randomPlan = () => minsArray[Math.floor(Math.random() * minsArray.length)];

        const subscriptions = {
            trail: randomPlan(),
            hour: 'hour1',
            day: 'day1',
        };

        const subscription =
            devTokenType === 'hour' ? subscriptions.hour :
            devTokenType === 'day' ? subscriptions.day :
            subscriptions.trail;

        const postTokenData = {
            token: "",
            tokentype: "devtoken",
            emailid,
            subscription,
        };

        return this.http.post<string>(
            userDataUrl,
            postTokenData,
            httpOptions,
        );
    }

    /**
     * Not Required.
     */
    public generateInterviewToken(emailid: string): Observable<string> {
        const postTokenData = {
            token: "",
            tokentype: "interviewtoken",
            emailid,
        };

        return this.http.post<string>(
            userDataUrl,
            postTokenData,
            httpOptions,
        );
    }
}