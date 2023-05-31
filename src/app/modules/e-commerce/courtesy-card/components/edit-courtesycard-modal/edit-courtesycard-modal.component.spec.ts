import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourtesycardModalComponent } from './edit-courtesycard-modal.component';

describe('EditCourtesycardModalComponent', () => {
  let component: EditCourtesycardModalComponent;
  let fixture: ComponentFixture<EditCourtesycardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourtesycardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourtesycardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
