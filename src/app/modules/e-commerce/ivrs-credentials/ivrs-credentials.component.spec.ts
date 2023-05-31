import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrsCredentialsComponent } from './ivrs-credentials.component';

describe('IvrsCredentialsComponent', () => {
  let component: IvrsCredentialsComponent;
  let fixture: ComponentFixture<IvrsCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvrsCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvrsCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
