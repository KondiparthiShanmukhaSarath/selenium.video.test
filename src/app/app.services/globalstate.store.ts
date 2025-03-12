import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class GlobalStateStore {
    testMode: boolean = false;

    appMode: boolean = false;

    showCpuUsage: boolean = false;

    constructor(router: Router) {
        router.events.subscribe((event) => {
            this.testMode = true
        });
    }
}