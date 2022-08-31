import { TestBed } from '@angular/core/testing';

import { LogueoGuard } from './logueo.guard';

describe('LogueoGuard', () => {
  let guard: LogueoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogueoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
