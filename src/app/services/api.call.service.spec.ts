import { TestBed } from '@angular/core/testing';
import { ApiCallService } from './api.call.service';
import { HttpClientModule } from '@angular/common/http';


describe('ApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      imports: [HttpClientModule],
      providers: []
   }
  ));

  it('should be created', () => {
    const service: ApiCallService = TestBed.get(ApiCallService);
    expect(service).toBeTruthy();
  });
});
