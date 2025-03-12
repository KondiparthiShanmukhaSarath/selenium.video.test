import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ordersUrl } from './api-endpoints';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

export interface IOrderNotes {  
    description: string,
}

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    constructor(private http: HttpClient) { }

    public placeOrder(amount: number, currency: string, receipt: string, notes: IOrderNotes): Observable<string> {
        const postOrderData = {
            amount,
            currency,
            receipt,
            notes,
        };

        return this.http.post<string>(
            ordersUrl,
            postOrderData,
            httpOptions,
        );
    }

    public authenticateTransaction (
        razorpay_payment_id: string,
        razorpay_order_id: string,
        razorpay_signature: string,
        devtokentype: string,
        emailid: string,
        subscription: string,
    ): Observable<string> {
        const postPaymentData = {
            authentication: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                devtokentype,
                emailid,
                subscription,
            }
        };

        return this.http.post<string>(
            ordersUrl,
            postPaymentData,
            httpOptions,
        );
    }
}