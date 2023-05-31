import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePermitsComponent } from './manage-permits.component';

describe('ManagePermitsComponent', () => {
  let component: ManagePermitsComponent;
  let fixture: ComponentFixture<ManagePermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
