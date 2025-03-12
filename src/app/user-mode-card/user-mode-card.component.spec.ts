import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModeCardComponent } from './user-mode-card.component';

describe('UserModeCardComponent', () => {
  let component: UserModeCardComponent;
  let fixture: ComponentFixture<UserModeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
