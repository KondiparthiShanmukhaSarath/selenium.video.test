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
            if (event instanceof NavigationEnd && event.url === '/ui-test-page') {
                this.testMode = true;
                this.appMode = false;
                this.showCpuUsage = false;
            }

            else if (event instanceof NavigationEnd && event.url === '/largenodesecretcpuusagerecord') {
                this.testMode = false;
                this.appMode = false;
                this.showCpuUsage = true;
            }

            else if (event instanceof NavigationEnd && event.url !== '/largenodesecretcpuusagerecord' && event.url !== '/ui-test-page' ) {
                this.appMode = true;
                this.testMode = false;
                this.showCpuUsage = false;
            }
        });
    }
}