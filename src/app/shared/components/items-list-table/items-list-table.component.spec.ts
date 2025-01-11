import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListTableComponent } from './items-list-table.component';

describe('ItemsListTableComponent', () => {
  let component: ItemsListTableComponent;
  let fixture: ComponentFixture<ItemsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
