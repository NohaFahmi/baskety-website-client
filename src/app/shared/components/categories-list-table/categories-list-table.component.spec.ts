import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListTableComponent } from './categories-list-table.component';

describe('CategoriesListTableComponent', () => {
  let component: CategoriesListTableComponent;
  let fixture: ComponentFixture<CategoriesListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
