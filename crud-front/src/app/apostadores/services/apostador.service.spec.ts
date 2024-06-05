import { TestBed } from '@angular/core/testing';

import { ApostadorService } from './apostador.service';

describe('ApostadorService', () => {
  let service: ApostadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApostadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
