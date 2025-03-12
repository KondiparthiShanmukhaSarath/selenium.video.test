import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestuipageMiscComponent } from './testuipage-misc.component';

describe('TestuipageMiscComponent', () => {
  let component: TestuipageMiscComponent;
  let fixture: ComponentFixture<TestuipageMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestuipageMiscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestuipageMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
