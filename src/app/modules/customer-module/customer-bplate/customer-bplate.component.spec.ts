import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBplateComponent } from './customer-bplate.component';

describe('CustomerBplateComponent', () => {
  let component: CustomerBplateComponent;
  let fixture: ComponentFixture<CustomerBplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
