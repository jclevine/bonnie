import { TestBed } from '@angular/core/testing';

import { RtmService } from './rtm.service';

describe('RtmService', () => {
  let service: RtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtmService);
  });

  it('should be created', () => {
    expect(service).toEqual('sadfsd');
  });
});
