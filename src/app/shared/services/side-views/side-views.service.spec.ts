import { TestBed } from '@angular/core/testing';

import { SideViewsService } from './side-views.service';

describe('SideViewsService', () => {
  let service: SideViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
