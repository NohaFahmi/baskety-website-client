import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemsComponent } from './add-edit-items.component';

describe('AddEditItemsComponent', () => {
  let component: AddEditItemsComponent;
  let fixture: ComponentFixture<AddEditItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
