import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListSectionComponent } from './history-list-section.component';

describe('HistoryListSectionComponent', () => {
  let component: HistoryListSectionComponent;
  let fixture: ComponentFixture<HistoryListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryListSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
