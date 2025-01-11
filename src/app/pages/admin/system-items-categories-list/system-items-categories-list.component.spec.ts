import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemItemsCategoriesListComponent } from './system-items-categories-list.component';

describe('SystemItemsCategoriesListComponent', () => {
  let component: SystemItemsCategoriesListComponent;
  let fixture: ComponentFixture<SystemItemsCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemItemsCategoriesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemItemsCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
