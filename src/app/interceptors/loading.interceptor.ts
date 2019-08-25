import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoadingScreenService } from '../services/loading-screen.service';
import { finalize, tap } from 'rxjs/operators';


@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

  activeRequests: number = 0;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return next.handle(request);
    return next
    .handle(request)
    .pipe(tap((ev: HttpEvent<any>) => {
      if (request) {
        this.loadingScreenService.startLoading();
      }
        if (ev instanceof HttpResponse && ev.body.SessionKey) {
          this.loadingScreenService.stopLoading();
        }
      })
    )
    /* let displayLoadingScreen = true;
    if (displayLoadingScreen) {
      this.activeRequests++;
      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;     
          if (this.activeRequests <= 29) {
            this.loadingScreenService.stopLoading();
            displayLoadingScreen = false;
          }
          else {
            this.loadingScreenService.startLoading();
          }
        })
      ) */
    } /* else {
      return next.handle(request);
    } */
  };
