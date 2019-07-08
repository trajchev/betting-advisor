import { TestBed } from '@angular/core/testing';

import { TicketsRemoteService } from './tickets-remote.service';

describe('TicketsRemoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketsRemoteService = TestBed.get(TicketsRemoteService);
    expect(service).toBeTruthy();
  });
});
