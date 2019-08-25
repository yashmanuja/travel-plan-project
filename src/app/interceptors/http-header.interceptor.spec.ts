import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from '../services/api.call.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './http-header.interceptor';
import { environment } from 'src/environments/environment';

describe(`AuthHttpInterceptor`, () => {
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

  it('should add an Authorization header', () => {
    service.postPollSession(environment.postService).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const httpRequest = httpMock.expectOne(environment.postService);
  
    expect(httpRequest.request.headers.has('x-rapidapi-host'));
    expect(httpRequest.request.headers.has('x-rapidapi-key'));
    expect(httpRequest.request.headers.has('Content-Type'));
  });
});