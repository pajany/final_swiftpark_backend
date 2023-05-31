import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepagesComponent } from './managepages.component';

describe('ManagepagesComponent', () => {
  let component: ManagepagesComponent;
  let fixture: ComponentFixture<ManagepagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
