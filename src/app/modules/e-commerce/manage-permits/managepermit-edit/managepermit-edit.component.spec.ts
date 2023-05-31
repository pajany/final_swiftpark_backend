import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepermitEditComponent } from './managepermit-edit.component';

describe('ManagepermitEditComponent', () => {
  let component: ManagepermitEditComponent;
  let fixture: ComponentFixture<ManagepermitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepermitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepermitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
