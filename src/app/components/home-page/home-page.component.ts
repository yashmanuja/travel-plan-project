import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, first, map, repeat } from 'rxjs/operators';
import { NgbDate, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AppConstant } from 'src/app/constants/app.constant';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiCallService } from 'src/app/services/api.call.service';
import { Itineraries, PriceDetail } from 'src/app/model/price.model';
/**
 * Module declaration Ends
 */
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class HomeComponent implements OnInit {
  public faCalendarAlt = faCalendarAlt;
  public states: {country: string, value: string}[] =  AppConstant.SOURCE;
  public statesDest: {country: string, value: string}[] = AppConstant.DESTINATION;
  public resultArray: any[] = [];
  public today: { year: number, month: number, day: number } = { year: 0, month: 0, day: 0 };
  public maxDate: { year: number, month: number, day: number } = { year: 0, month: 0, day: 0 };
  public searchForm: FormGroup;
  public flightResponse: PriceDetail;
  /**
   * Variable declaration ends 
   */
  constructor(private _fb: FormBuilder, private _apiCall: ApiCallService) {}
  /**
   *  Form initialization on init and itscorresponding form controls
   */
  ngOnInit() {
    this.searchForm = this._fb.group({
      source: new FormControl([], Validators.required),
      destination: new FormControl([], Validators.required),
      adultNum: new FormControl({value: 1, disabled: true}),
      currency: new FormControl({value: 'USD', disabled: true}),
      country: new FormControl({value: 'US', disabled: true}),
    });
  }
 
  /**
   * Funtion for Typeahead country selection
   */
  public formatter = (x: { country: string }) => x.country;
  /**
   * Funtion to disable the dates in calendar based on the condition
   */
  public isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;
   /**
   * Funtion to filter the date based on particular date
   */
  public getPrice = (date: NgbDate): number => {
    const convertedDate: Date = new Date(date.year, date.month - 1, date.day);
    const filterDate: {date: Date, itineraries: Itineraries, leastPrice: number}[] = 
    this.resultArray.filter(val => this.hyphenDateFn(val.date) === this.hyphenDateFn(convertedDate));
    if (filterDate.length) {
      return filterDate[0].leastPrice;
    }
  }
   /**
   * Funtion return the minimu value from an entire array
   */
  private minArrayVal = (array): number => {
    return Math.min.apply(Math, array);
  }
   /**
   * Funtion to convert the date into a hyphen separated date. For eg:- 10/01/2015
   */
  private hyphenDateFn = (date: Date): string => {
    const twoDigDate = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const twoDigMon = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    return `${date.getFullYear()}-${twoDigMon}-${twoDigDate}`;
  }
   /**
   * Funtion to convert the ISO date format to ngbDate
   */
  private ngbDateFormat = (dateIso: Date): any => {
    return { year: dateIso.getFullYear(), month: dateIso.getMonth() + 1, day: dateIso.getDate() }
  }
  /**
   * Funtion to filter the selected value in the typeahed
   */
  public searchInTypeAhead(arrSearch: any): (text: Observable<string>) => Observable<string> {
   let search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : arrSearch.filter(v => v.country.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    return search;
  }
  /**
   * Funtion to start Polling
   */
 public serviceCall() { 
  if (this.searchForm.controls['source'].value.hasOwnProperty('value') &&
      this.searchForm.controls['destination'].value.hasOwnProperty('value') &&
      (this.searchForm.controls['source'].value.value !== this.searchForm.controls['destination'].value.value)) {
      const today = new Date();
      for (let i = 0; i <= AppConstant.CALENDARDAYS; i++) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + i);
        this.hyphenDateFn(nextDate);
        const pollPostBody: string = 
        `currency=USD&locale=en-US&originPlace=${this.searchForm.controls['source'].value.value}-sky&destinationPlace=${this.searchForm.controls['destination'].value.value}-sky&outboundDate=${this.hyphenDateFn(nextDate)}&adults=1&country=US`;
        /**
         * Subscribing to the Post Poll service call
         */
        this._apiCall.postPollSession(pollPostBody).subscribe(res => {
            
          const getSessionKey = res.headers.get('location').split('/')[res.headers.get('location').split('/').length - 1];
            AppConstant.SESSIONKEY = getSessionKey;
            /**
             * Subscribing to the get poll service call after the session key is fetched
             */
            this._apiCall.getPollSession().pipe(repeat(), first(flightResp => flightResp.Status === AppConstant.STATUS)).
            subscribe(flightResp => {
            this.flightResponse = flightResp;
            
            if (this.flightResponse.Status === AppConstant.STATUS) {
                let flightsObj: { date: Date, itineraries: any[], leastPrice: number } = { date: new Date(), itineraries: [], leastPrice: 0 };
                  if (this.flightResponse.Legs.length)
                    flightsObj.date = new Date(this.flightResponse.Legs[0].Departure);
                  else
                    flightsObj.date = new Date("1970-03-25");
                    flightsObj.itineraries = this.flightResponse.Itineraries;
                    const priceArray: number[] = [];
                    flightsObj.itineraries.map((itenary) => {
                    itenary.PricingOptions.map((price) => {
                    priceArray.push(price.Price);
                  });
                });
                    flightsObj.leastPrice = this.minArrayVal(priceArray);
                    this.resultArray.push(flightsObj);
                }
              }, errGet => {
                console.log(errGet);
            });
          }, errorPost => {
            console.log(errorPost);
          });
        }
      this.today = this.ngbDateFormat(today);
      const lastDate: Date = new Date();
      lastDate.setDate(today.getDate() + AppConstant.CALENDARDAYS);
      this.maxDate = this.ngbDateFormat(lastDate); 
    }
 }
  public submit = (): void => {
  }
}