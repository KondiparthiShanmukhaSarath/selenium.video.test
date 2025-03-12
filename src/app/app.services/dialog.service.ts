import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { DynamicDialogComponentComponent, modalTab } from '../dynamic-dialog-component/dynamic-dialog-component.component';


@Injectable({
    providedIn: "root",
})
export class DialogService {
    public isModalOpen: boolean = false;

    constructor(public dialog: MatDialog, private router: Router) {
        switch (window.location.pathname) {
            case '/home':
                this.openDialog(modalTab.aboutus);
                break;
            case '/privacy-policy':
                this.openDialog(modalTab.privacy);
                break;
            case '/terms-and-conditions':
                this.openDialog(modalTab.tandc);
                break;
            case '/pricing':
                this.openDialog(modalTab.pricing);
                break;
            case '/faqs':
                this.openDialog(modalTab.faqs);
                break;
            case '/ads':
                this.openDialog();
                break;
            case '/loginsuccess':
                this.openDialog(modalTab.loginsuccess);
                break;
        }

        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && event.url === '/home') {
                this.openDialog(modalTab.aboutus);
            }

            if (event instanceof NavigationEnd && event.url === '/terms-and-conditions') {
                this.openDialog(modalTab.tandc);
            }

            if (event instanceof NavigationEnd && event.url === '/privacy-policy') {
                this.openDialog(modalTab.privacy);
            }

            if (event instanceof NavigationEnd && event.url === '/pricing') {
                this.openDialog(modalTab.pricing);
            }

            if (event instanceof NavigationEnd && event.url === '/faqs') {
                this.openDialog(modalTab.faqs);
            }

            if (event instanceof NavigationEnd && event.url === '/ads') {
                this.openDialog(modalTab.ads);
            }

            if (event instanceof NavigationEnd && event.url === '/loginsuccess') {
                this.openDialog(modalTab.loginsuccess);
            }
        });
    }

    public openDialog(activeTab = modalTab.ads): void {
        if (!this.isModalOpen) {
            this.isModalOpen = true;

            switch (activeTab) {
                case modalTab.aboutus:
                    this.router.navigateByUrl('/home');
                    break;
                case modalTab.tandc:
                    this.router.navigateByUrl('/terms-and-conditions');
                    break;
                case modalTab.privacy:
                    this.router.navigateByUrl('/privacy-policy');
                    break;
                case modalTab.pricing:
                    this.router.navigateByUrl('/pricing');
                    break;
                case modalTab.faqs:
                    this.router.navigateByUrl('/faqs');
                    break;
                case modalTab.ads:
                    this.router.navigateByUrl('/ads');
                    break;
                case modalTab.loginsuccess:
                    this.router.navigateByUrl('/loginsuccess');
                    break;
            }

            const dialogRef = this.dialog.open(DynamicDialogComponentComponent, { disableClose: true, data: { tabname: activeTab } });

            dialogRef.afterClosed().subscribe(result => {
                this.router.navigateByUrl('');
                this.isModalOpen = false;
            });
        }
    }
}
