import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayIntegrationComponent } from './payment-gateway-integration.component';

describe('PaymentGatewayIntegrationComponent', () => {
  let component: PaymentGatewayIntegrationComponent;
  let fixture: ComponentFixture<PaymentGatewayIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
