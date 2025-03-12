import { Component } from '@angular/core';
import { DialogService } from '../app.services/dialog.service';
import { modalTab } from '../dynamic-dialog-component/dynamic-dialog-component.component';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.less']
})
export class TopheaderComponent {
  constructor(private readonly dialogService: DialogService) { }

  public openAboutUsModal(): void {
    this.dialogService.openDialog(modalTab.aboutus);
  }
}
