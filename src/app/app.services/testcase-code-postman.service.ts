import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { codetovideoUrl } from "./api-endpoints";

export interface ICodeExecutorDataType {
    code: string[],
    imports: string[],
    techstack: string,
}

export interface ICodeExecutorResponse {
    videoURL: string,
    consoleerrors?: string,
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: "root",
})
export class TestCaseCodePostManService {
    constructor(
        private http: HttpClient,
    ) { }

    public executeCodeInNode(codeExecutorData: ICodeExecutorDataType): Observable<string> {
        const postURL = codetovideoUrl;
        // console.log(codeExecutorData, postURL, "Sending POST");
        return this.http.post<string>(
            postURL,
            codeExecutorData,
            httpOptions
        );
    }
}