import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from '../services/api.call.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingScreenInterceptor } from './loading.interceptor';

describe(`LoadingScreenInterceptor`, () => {
  let service: ApiCallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiCallService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingScreenInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(ApiCallService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.getPollSession().subscribe(response => {
      expect(response).toBeTruthy();
    });
  });
});