import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { cpuusage } from '../app.services/api-endpoints';

const POLL_THRESHOLD = 30;

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.less']
})
export class CpuUsageComponent {

  public cpuusage$: Observable<string> = this.http.get<string>(cpuusage);

  public pollingMode = false;

  public pollCount = POLL_THRESHOLD;

  public readonly stringify = JSON.stringify;

  public readonly parse = JSON.parse;

  private interval: unknown;

  constructor(private http: HttpClient) {}

  public onSliderToggleHandler(): void {
    this.pollingMode ? this.startPolling() : this.stopPolling();
  }

  private startPolling(): void {
    this.interval = setInterval(() => {
      this.cpuusage$ = this.http.get<string>(cpuusage);
      this.pollCount = this.pollCount - 1;
      if (this.pollCount < 0) {
        this.stopPolling();
        this.pollingMode = false;
      }
    }, 2000);
  }

  private stopPolling(): void {
    clearInterval(this.interval as number);
    this.pollCount = POLL_THRESHOLD;
  }
}
