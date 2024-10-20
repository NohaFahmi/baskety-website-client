import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListItemCardComponent } from './shopping-list-item-card.component';

describe('ShoppingListItemCardComponent', () => {
  let component: ShoppingListItemCardComponent;
  let fixture: ComponentFixture<ShoppingListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
