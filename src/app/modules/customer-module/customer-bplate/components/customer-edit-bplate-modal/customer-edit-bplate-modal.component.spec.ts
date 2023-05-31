import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditBplateModalComponent } from './customer-edit-bplate-modal.component';

describe('CustomerEditBplateModalComponent', () => {
  let component: CustomerEditBplateModalComponent;
  let fixture: ComponentFixture<CustomerEditBplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditBplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditBplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
