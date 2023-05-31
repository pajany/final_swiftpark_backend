import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCourtesycardModalComponent } from './fetch-courtesycard-modal.component';

describe('FetchCourtesycardModalComponent', () => {
  let component: FetchCourtesycardModalComponent;
  let fixture: ComponentFixture<FetchCourtesycardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchCourtesycardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCourtesycardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
