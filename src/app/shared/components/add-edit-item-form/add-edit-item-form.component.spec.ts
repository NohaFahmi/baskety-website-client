import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemFormComponent } from './add-edit-item-form.component';

describe('AddEditItemFormComponent', () => {
  let component: AddEditItemFormComponent;
  let fixture: ComponentFixture<AddEditItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
