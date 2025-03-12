import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTokensTableComponent } from './all-tokens-table.component';

describe('AllTokensTableComponent', () => {
  let component: AllTokensTableComponent;
  let fixture: ComponentFixture<AllTokensTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTokensTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTokensTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
