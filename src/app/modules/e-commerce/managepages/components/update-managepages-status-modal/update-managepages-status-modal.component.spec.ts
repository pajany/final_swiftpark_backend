import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagepagesStatusModalComponent } from './update-managepages-status-modal.component';

describe('UpdateManagepagesStatusModalComponent', () => {
  let component: UpdateManagepagesStatusModalComponent;
  let fixture: ComponentFixture<UpdateManagepagesStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateManagepagesStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManagepagesStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
