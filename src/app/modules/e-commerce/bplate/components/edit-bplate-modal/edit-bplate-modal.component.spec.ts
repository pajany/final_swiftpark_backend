import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBplateModalComponent } from './edit-bplate-modal.component';

describe('EditBplateModalComponent', () => {
  let component: EditBplateModalComponent;
  let fixture: ComponentFixture<EditBplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
