import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercourtesyCardsComponent } from './customercourtesy-cards.component';

describe('CustomercourtesyCardsComponent', () => {
  let component: CustomercourtesyCardsComponent;
  let fixture: ComponentFixture<CustomercourtesyCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercourtesyCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercourtesyCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
