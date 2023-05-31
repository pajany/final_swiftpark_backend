import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesyCardComponent } from './courtesy-card.component';

describe('CourtesyCardComponent', () => {
  let component: CourtesyCardComponent;
  let fixture: ComponentFixture<CourtesyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtesyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
