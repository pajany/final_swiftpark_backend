import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesycardDetailsComponent } from './courtesycard-details.component';

describe('CourtesycardDetailsComponent', () => {
  let component: CourtesycardDetailsComponent;
  let fixture: ComponentFixture<CourtesycardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtesycardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesycardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
