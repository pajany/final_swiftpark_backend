import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotNumberComponent } from './lot-number.component';

describe('LotNumberComponent', () => {
  let component: LotNumberComponent;
  let fixture: ComponentFixture<LotNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
