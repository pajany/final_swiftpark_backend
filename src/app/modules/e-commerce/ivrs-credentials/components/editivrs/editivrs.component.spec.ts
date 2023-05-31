import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditivrsComponent } from './editivrs.component';

describe('EditivrsComponent', () => {
  let component: EditivrsComponent;
  let fixture: ComponentFixture<EditivrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditivrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditivrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
