import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchManagepagesModalComponent } from './fetch-managepages-modal.component';

describe('FetchManagepagesModalComponent', () => {
  let component: FetchManagepagesModalComponent;
  let fixture: ComponentFixture<FetchManagepagesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchManagepagesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchManagepagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
