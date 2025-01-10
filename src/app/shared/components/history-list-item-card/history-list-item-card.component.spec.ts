import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListItemCardComponent } from './history-list-item-card.component';

describe('HistoryListItemCardComponent', () => {
  let component: HistoryListItemCardComponent;
  let fixture: ComponentFixture<HistoryListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryListItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
