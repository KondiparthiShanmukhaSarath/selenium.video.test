import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  AllTechstacks,
  techstackHash,
  VirtualUITestsConfigService,
} from '../app.services/virtual-ui-tests.config.service';

@Component({
  selector: 'app-techstackselector',
  templateUrl: './techstackselector.component.html',
  styleUrls: ['./techstackselector.component.less']
})
export class TechstackselectorComponent implements OnInit {
  public techstacks = Object.keys(techstackHash);

  public virtualUITestsConfigService!: VirtualUITestsConfigService;

  public get techstackHintVisibility(): boolean {
    return !this.virtualUITestsConfigService.selectedTechStackValue;
  }

  constructor(
    virtualUITestsConfigService: VirtualUITestsConfigService,
  ) {
    this.virtualUITestsConfigService = virtualUITestsConfigService;
  }

  ngOnInit(): void {
  }

  public trackByMethod(index: number, item: string) {
    return !item ? null : index;
  }

  public getTechStackName(tech: string): AllTechstacks {
    return this.virtualUITestsConfigService.getTechStackName(tech);
  }

  public getTechStackAvailability(tech: string): string | null {
    return this.virtualUITestsConfigService.getTechStackAvailability(tech) ? null : '(Coming Soon)';
  }

  public onTechstackChange(event: EventEmitter<string>) {
    this.virtualUITestsConfigService.selectedTechStackValue = event.toString();
  }
}
