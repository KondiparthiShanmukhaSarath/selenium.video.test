import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav/sidenav";


@Injectable({
    providedIn: "root",
})
export class UserProfileSideNavService {
    constructor() { }

    private sidenav!: MatSidenav;

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public getSideNav(): MatSidenav {
        return this.sidenav;
    }

    public open() {
        this.sidenav.opened = true;
        return this.sidenav.open();
    }

    public close() {
        return this.sidenav.close();
    }

    public toggle() {
        return this.sidenav.toggle();
    }
}