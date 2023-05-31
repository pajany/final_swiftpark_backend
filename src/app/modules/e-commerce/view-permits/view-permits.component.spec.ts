import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermitsComponent } from './view-permits.component';

describe('ViewPermitsComponent', () => {
  let component: ViewPermitsComponent;
  let fixture: ComponentFixture<ViewPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
