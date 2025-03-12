import { Component, OnInit } from '@angular/core';
import { UserStateManagerService } from '../app.services/user-state-manager.service';
import { Router } from '@angular/router';


import {
  IVirtualUITestsConfig,
  VirtualUITestsConfigService,
} from '../app.services/virtual-ui-tests.config.service';
import { TestuipageComponent } from '../testuipage/testuipage.component';
import { CpuUsageComponent } from '../cpu-usage/cpu-usage.component';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.less']
})
export class TestcasesComponent implements OnInit {
  public tests!: IVirtualUITestsConfig[];
  private currentTest!: IVirtualUITestsConfig;
  private currentTechStackValue!: string;
  private virtualUITestsConfig: VirtualUITestsConfigService;

  constructor(
    virtualUITestsConfig: VirtualUITestsConfigService,
    private readonly userStateManagerService: UserStateManagerService,
    private readonly router: Router,
  ) {
    this.virtualUITestsConfig = virtualUITestsConfig;
    this.currentTechStackValue = virtualUITestsConfig.selectedTechStackValue;
  }

  ngOnInit(): void {
    this.virtualUITestsConfig.getJson().subscribe(data => {
      this.tests = [...data];

      const routes = this.tests.map(test => {
        return {
          path: this.getRouteLink(test),
          component: TestcasesComponent,
        }
      });

      this.router.resetConfig([
        ...routes, {
          path: 'home',
          component: TestcasesComponent,
        }, {
          path: 'ui-test-page',
          component: TestuipageComponent,
        }, {
          path: 'privacy-policy',
          component: TestcasesComponent,
        }, {
          path: 'terms-and-conditions',
          component: TestcasesComponent,
        }, {
          path: 'pricing',
          component: TestcasesComponent,
        }, {
          path: 'largenodesecretcpuusagerecord',
          component: CpuUsageComponent,
        }, {
          path: 'ads',
          component: TestcasesComponent,
        }, {
          path: 'faqs',
          component: TestcasesComponent,
        }, {
          path: 'loginsuccess',
          component: TestcasesComponent,
        }
      ]);
    });
  }

  public getCode(test: IVirtualUITestsConfig): string {
    this.currentTest = test;
    const { techstacks } = test;
    const requiredTechstacks = techstacks.filter((item): boolean => {
      return this.virtualUITestsConfig.selectedTechStackValue in item;
    });

    const requiredTechstack = requiredTechstacks.length ? requiredTechstacks[0] : null;

    if (!requiredTechstack) {
      return ""
    }

    const { code } = Object.values(requiredTechstack)[0]
    return this.isInterviewMode ? '' : code;
  }

  public trackByMethod(index: number, item: IVirtualUITestsConfig) {
    return !item ? null : index;
  }

  public resetCode(){
    this.virtualUITestsConfig.selectedTechStackValue = "";
  }

  public getTestCaseCodeVisibility() {
    return this.virtualUITestsConfig.isCodeVisible;
  }

  public get isInterviewMode() {
    return this.userStateManagerService.userstate.activemode === 'interview';
  }

  public getId(test: IVirtualUITestsConfig): string {
    const id = test.testcase_title.replace(/[\W_]+/g, '-');

    return id.endsWith('-') ? id.slice(0, -1) : id;
  }

  public isAnchorTagMatched(test: IVirtualUITestsConfig): boolean{
    const id = this.getId(test);

    return this.router.url.includes(id);
  }

  public getRouteLink(test: IVirtualUITestsConfig): string {
    return this.getId(test);
  }
}
