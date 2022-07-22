import { TestBed } from '@angular/core/testing';

import { AuthHeaderIntercepterService } from './auth-header-intercepter.service';

describe('AuthHeaderIntercepterService', () => {
  let service: AuthHeaderIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHeaderIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
