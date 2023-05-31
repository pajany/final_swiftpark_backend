import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManagepageModalComponent } from './delete-managepage-modal.component';

describe('DeleteManagepageModalComponent', () => {
  let component: DeleteManagepageModalComponent;
  let fixture: ComponentFixture<DeleteManagepageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManagepageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManagepageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
