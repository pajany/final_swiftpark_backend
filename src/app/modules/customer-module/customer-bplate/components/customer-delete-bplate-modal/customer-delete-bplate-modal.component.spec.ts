import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleteBplateModalComponent } from './customer-delete-bplate-modal.component';

describe('CustomerDeleteBplateModalComponent', () => {
  let component: CustomerDeleteBplateModalComponent;
  let fixture: ComponentFixture<CustomerDeleteBplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDeleteBplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeleteBplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
