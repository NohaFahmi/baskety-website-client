import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListCarouselComponent } from './categories-list-carousel.component';

describe('CategoriesListCarouselComponent', () => {
  let component: CategoriesListCarouselComponent;
  let fixture: ComponentFixture<CategoriesListCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesListCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
