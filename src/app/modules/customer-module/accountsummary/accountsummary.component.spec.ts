import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsummaryComponent } from './accountsummary.component';

describe('AccountsummaryComponent', () => {
  let component: AccountsummaryComponent;
  let fixture: ComponentFixture<AccountsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
