import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourtesycardModalComponent } from './update-courtesycard-modal.component';

describe('UpdateCourtesycardModalComponent', () => {
  let component: UpdateCourtesycardModalComponent;
  let fixture: ComponentFixture<UpdateCourtesycardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourtesycardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourtesycardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
