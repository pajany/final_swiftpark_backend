import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCourtesycardsComponent } from './cust-courtesycards.component';

describe('CustCourtesycardsComponent', () => {
  let component: CustCourtesycardsComponent;
  let fixture: ComponentFixture<CustCourtesycardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCourtesycardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCourtesycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
