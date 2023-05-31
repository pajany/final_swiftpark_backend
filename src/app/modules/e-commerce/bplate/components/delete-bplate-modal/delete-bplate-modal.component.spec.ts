import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBplateModalComponent } from './delete-bplate-modal.component';

describe('DeleteBplateModalComponent', () => {
  let component: DeleteBplateModalComponent;
  let fixture: ComponentFixture<DeleteBplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
