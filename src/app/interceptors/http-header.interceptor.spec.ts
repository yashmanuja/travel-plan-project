import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from '../services/api.call.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './http-header.interceptor';
import { environment } from 'src/environments/environment';

describe(`HeaderInterceptor`, () => {
  let service: ApiCallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiCallService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(ApiCallService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add headers on the request', () => {
    service.postPollSession(environment.postService).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const httpRequest = httpMock.expectOne(environment.postService);
  
    expect(httpRequest.request.headers.has('x-rapidapi-host')).toBe(true);
    expect(httpRequest.request.headers.has('x-rapidapi-key')).toBe(true);
    expect(httpRequest.request.headers.has('Content-Type')).toBe(true);
  });
});