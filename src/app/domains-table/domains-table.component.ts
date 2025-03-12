import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { domainstable } from '../app.services/api-endpoints';

interface IDomainTable {
  name: string;
  updated: Date;
  expiry: Date;
  remainingtime?: string;
  rank?: number;
};

interface IRemainingTime {
  milliseconds: number,
  readable: string,
}

let ELEMENT_DATA: IDomainTable[] = [
  { name: 'test a domain', updated: new Date('2021-10-16T04:36:49Z'), expiry: new Date('2023-10-11T04:59:57Z') },
];

@Component({
  selector: 'app-domains-table',
  templateUrl: './domains-table.component.html',
  styleUrls: ['./domains-table.component.less']
})
export class DomainsTableComponent {

  public readonly displayedColumns: string[] = ['name', 'updated', 'expiry', 'remainingtime'];
  public dataSource = ELEMENT_DATA;

  constructor(private readonly http: HttpClient) {
    this.http.get<string>(domainstable).subscribe(
      domainsData => {
        const domains: IDomainTable[] = JSON.parse(domainsData).domains

        ELEMENT_DATA = domains.map(info => {
          return {
            name: info.name,
            updated: new Date(info.updated),
            expiry: new Date(info.expiry),
          };
        });

        ELEMENT_DATA.forEach((entry) => {
          const { milliseconds, readable } = this.getRemainingTime(entry.expiry)
          entry.remainingtime = readable;
          entry.rank = milliseconds ?? Infinity;
        });

        ELEMENT_DATA.sort((x, y) => (x.rank ?? 0) - (y.rank ?? 0));

        this.dataSource = ELEMENT_DATA;
      }
    );
  }

  public getRemainingTime(date: Date): IRemainingTime {
    const today = new Date();
    let diffInMicroSeconds = date.getTime() - today.getTime();

    diffInMicroSeconds = Math.max(0, diffInMicroSeconds) || 0;

    const diffDays = Math.floor(diffInMicroSeconds / 86400000);
    const diffHrs = Math.floor((diffInMicroSeconds % 86400000) / 3600000); 
    const diffMins = Math.round(((diffInMicroSeconds % 86400000) % 3600000) / 60000);

    const remainingtime = diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes";

    return {
      milliseconds: diffInMicroSeconds,
      readable: remainingtime
    };
  }

  public reIterateDomains(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post<string>(
      domainstable,
      JSON.stringify({}),
      httpOptions,
    ).subscribe();
  }

}
