import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsComponentComponent } from './terms-and-conditions-component.component';

describe('TermsAndConditionsComponentComponent', () => {
  let component: TermsAndConditionsComponentComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
