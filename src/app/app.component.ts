import { Component } from '@angular/core';
import { TestuipageComponent } from './testuipage/testuipage.component';

@Component({
  selector: 'app-root',
  imports: [TestuipageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'selenium.video.test';
}
