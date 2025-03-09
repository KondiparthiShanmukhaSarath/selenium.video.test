import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestuipageComponent } from './testuipage.component';

describe('TestuipageComponent', () => {
  let component: TestuipageComponent;
  let fixture: ComponentFixture<TestuipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestuipageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestuipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
