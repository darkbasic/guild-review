import { TestBed } from '@angular/core/testing';

import { PrListerApolloService } from './pr-lister-apollo.service';

describe('PrListerApolloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrListerApolloService = TestBed.get(PrListerApolloService);
    expect(service).toBeTruthy();
  });
});
