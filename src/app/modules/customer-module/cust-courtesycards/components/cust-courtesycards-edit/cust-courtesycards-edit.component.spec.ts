import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCourtesycardsEditComponent } from './cust-courtesycards-edit.component';

describe('CustCourtesycardsEditComponent', () => {
  let component: CustCourtesycardsEditComponent;
  let fixture: ComponentFixture<CustCourtesycardsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCourtesycardsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCourtesycardsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
