import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFiledisputeModalComponent } from './edit-filedispute-modal.component';

describe('EditFiledisputeModalComponent', () => {
  let component: EditFiledisputeModalComponent;
  let fixture: ComponentFixture<EditFiledisputeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFiledisputeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFiledisputeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
