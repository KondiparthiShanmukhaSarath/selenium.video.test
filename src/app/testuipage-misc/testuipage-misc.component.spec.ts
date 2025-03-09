import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestuipageMiscComponent } from './testuipage-misc.component';

describe('TestuipageMiscComponent', () => {
  let component: TestuipageMiscComponent;
  let fixture: ComponentFixture<TestuipageMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestuipageMiscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestuipageMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
