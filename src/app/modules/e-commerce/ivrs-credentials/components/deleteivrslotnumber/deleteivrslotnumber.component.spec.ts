import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteivrslotnumberComponent } from './deleteivrslotnumber.component';

describe('DeleteivrslotnumberComponent', () => {
  let component: DeleteivrslotnumberComponent;
  let fixture: ComponentFixture<DeleteivrslotnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteivrslotnumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteivrslotnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
