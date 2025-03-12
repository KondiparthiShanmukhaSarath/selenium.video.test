import { Component } from '@angular/core';
import { GlobalStateStore } from './app.services/globalstate.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public readonly globalStateStore: GlobalStateStore) {}
}
