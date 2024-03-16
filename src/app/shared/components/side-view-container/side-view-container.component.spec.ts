import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideViewContainerComponent } from './side-view-container.component';

describe('SideViewContainerComponent', () => {
  let component: SideViewContainerComponent;
  let fixture: ComponentFixture<SideViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideViewContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
