import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledisputeComponent } from './filedispute.component';

describe('FiledisputeComponent', () => {
  let component: FiledisputeComponent;
  let fixture: ComponentFixture<FiledisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
