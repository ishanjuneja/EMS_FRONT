import { TestBed, inject } from '@angular/core/testing';

import { StaticGraphService } from './static-graph.service';

describe('StaticGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticGraphService]
    });
  });

  it('should be created', inject([StaticGraphService], (service: StaticGraphService) => {
    expect(service).toBeTruthy();
  }));
});
