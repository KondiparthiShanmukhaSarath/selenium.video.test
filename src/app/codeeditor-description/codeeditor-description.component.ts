import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeeditor-description',
  templateUrl: './codeeditor-description.component.html',
  styleUrls: ['./codeeditor-description.component.less']
})
export class CodeeditorDescriptionComponent implements OnInit {
  @Input()
  public description!: string;

  @Input()
  public title!: string;

  @Input()
  public source = 'NA';

  public get sourceLink(): string {
    return this.isValidURL(this.source) ? this.source : 'https:/www.google.com/';
  }

  constructor() { }

  ngOnInit(): void {}

  public isValidURL(urlLink: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?' +          // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +  // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' +                       // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +                   // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +                          // query string
      '(\\#[-a-z\\d_]*)?$', 'i');                           // fragment locator
    return !!pattern.test(urlLink);
  }
}
