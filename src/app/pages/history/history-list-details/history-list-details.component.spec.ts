import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListDetailsComponent } from './history-list-details.component';

describe('HistoryListDetailsComponent', () => {
  let component: HistoryListDetailsComponent;
  let fixture: ComponentFixture<HistoryListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryListDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
