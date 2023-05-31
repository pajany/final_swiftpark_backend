import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepageEditComponent } from './managepage-edit.component';

describe('ManagepageEditComponent', () => {
  let component: ManagepageEditComponent;
  let fixture: ComponentFixture<ManagepageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
