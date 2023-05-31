import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourtesycardModalComponent } from './delete-courtesycard-modal.component';

describe('DeleteCourtesycardModalComponent', () => {
  let component: DeleteCourtesycardModalComponent;
  let fixture: ComponentFixture<DeleteCourtesycardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCourtesycardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCourtesycardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
