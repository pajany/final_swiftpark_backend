import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourtesycardsModalComponent } from './delete-courtesycards-modal.component';

describe('DeleteCourtesycardsModalComponent', () => {
  let component: DeleteCourtesycardsModalComponent;
  let fixture: ComponentFixture<DeleteCourtesycardsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCourtesycardsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCourtesycardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
