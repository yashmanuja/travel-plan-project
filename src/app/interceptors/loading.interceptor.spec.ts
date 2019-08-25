import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from '../services/api.call.service';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { LoadingScreenInterceptor } from './loading.interceptor';
import { environment } from 'src/environments/environment';
import { LoadingScreenService } from '../services/loading-screen.service';
describe(`LoadingScreenInterceptor`, () => {
  let service: ApiCallService;
  let httpMock: HttpTestingController;
  let loadingScreenService: LoadingScreenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiCallService,
        LoadingScreenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingScreenInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(ApiCallService);
    httpMock = TestBed.get(HttpTestingController);
    loadingScreenService =  TestBed.get(LoadingScreenService);
  });

  it('should add an Authorization header', () => {
    expect(LoadingScreenInterceptor).toBeDefined();
    
    service.getPollSession().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const loaderService = spyOn(loadingScreenService, 'startLoading');
    const request: HttpRequest<any> = new HttpRequest<any>('GET', environment.getService);
    expect(request.method).toEqual("GET");
  });
});