import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManagepagesModalComponent } from './delete-managepages-modal.component';

describe('DeleteManagepagesModalComponent', () => {
  let component: DeleteManagepagesModalComponent;
  let fixture: ComponentFixture<DeleteManagepagesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManagepagesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManagepagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
