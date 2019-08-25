import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppConstant } from '../constants/app.constant';
import { PriceDetail } from '../model/price.model';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private _http: HttpClient) { }

  public postPollSession(pollPostBody): Observable<any> {
    return this._http.post<HttpHeaderResponse>(environment.postService, pollPostBody, { observe: 'response' })
  }
  public getPollSession(): Observable<PriceDetail> {
    return this._http.get<PriceDetail>(environment.getService + AppConstant.SESSIONKEY)
  }
}
