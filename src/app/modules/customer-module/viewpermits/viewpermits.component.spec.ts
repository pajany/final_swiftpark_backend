import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpermitsComponent } from './viewpermits.component';

describe('ViewpermitsComponent', () => {
  let component: ViewpermitsComponent;
  let fixture: ComponentFixture<ViewpermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
