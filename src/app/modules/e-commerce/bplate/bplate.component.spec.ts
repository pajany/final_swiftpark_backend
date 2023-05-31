import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BplateComponent } from './bplate.component';

describe('BplateComponent', () => {
  let component: BplateComponent;
  let fixture: ComponentFixture<BplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
