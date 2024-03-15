import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListSectionComponent } from './items-list-section.component';

describe('ItemsListSectionComponent', () => {
  let component: ItemsListSectionComponent;
  let fixture: ComponentFixture<ItemsListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
