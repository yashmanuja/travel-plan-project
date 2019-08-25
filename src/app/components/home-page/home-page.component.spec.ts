import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NgbModule, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { HomeComponent } from './home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { from, observable, of, Observable, Subscriber } from 'rxjs';
import { ApiCallService } from 'src/app/services/api.call.service';
import { PriceDetail } from 'src/app/model/price.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const today = new Date();
  const date: {year: number, month: number, day: number} = 
  {year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()};
  const ngbFormDate: NgbDate = new NgbDate(date.year, date.month, date.day);
  const current = { month: 7 };
  let apiCallService: ApiCallService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgbModule, HttpClientModule ],
      declarations: [ HomeComponent ],
      providers: [HttpClientModule, ApiCallService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.get(ApiCallService);
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Function isDisabled should disable the dates of other months', () => {
    const returnMon = component.isDisabled( ngbFormDate, current);
    expect(returnMon).toBe(true);
  });

  it('Function getPrice should return the Least Price', () => {
    component.resultArray = [{date: new Date(), itineraries: [], leastPrice: 10}]
    const returnMon = component.getPrice( ngbFormDate);
    expect(returnMon).toEqual(10);
  });

  it('Function searchInTypeAhead should return the filtered value in Typeahead', () => {
    const textObs = from('S'); 
    let searchedObj;
    const typeaheadSrc = component.searchInTypeAhead(component.states);
    typeaheadSrc(textObs).subscribe( val =>  searchedObj = val);
    expect(searchedObj[0]).toEqual({ country: 'Singapore (SIN)', value: 'SIN' });
  });
  it('Function Service Calling', () => {
    component.searchForm.controls['source'].setValue({ country: 'Singapore (SIN)', value: 'SIN' });
    component.searchForm.controls['destination'].setValue({ country: 'Kuala Lumpur (KUL)', value: 'KUL' });
    const customheaders = { headers: new HttpHeaders({'location':  'https://xy.zyz/12345678-5678-41b9-1234-0738650eb5c7'})}; 
    const ObsResp = of({body: {}, headers: customheaders.headers, ok: true, status: 201, statusText: "Created", type: 4});
    const pollSpy = spyOn(apiCallService, 'postPollSession').and.returnValue(ObsResp);
    //let getObsResp = new PriceDetail();
    const getObsRespStub: PriceDetail = {
      Agents:  [{
        Id: 0,
        ImageUrl: '',
        Name: '',
        OptimisedForMobile: true,
        Status: '',
        Type: '',
      }],
      Carriers: [{
        Code: '',
        DisplayCode: '',
        Id: 0,
        ImageUrl: '',
        Name: '',
    }],
      Currencies: [
        {
          Code: 'USD',
          DecimalDigits: 1,
          DecimalSeparator: ',',
          RoundingCoefficient: 2,
          SpaceBetweenAmountAndSymbol: false,
          Symbol: '$',
          SymbolOnLeft: true,
          ThousandsSeparator: '.',
      }],
      Itineraries: [{
        BookingDetailsLink: {
          Body: '',
          Method:  '',
          Uri: '',
        },
        OutboundLegId: '',
        PricingOptions: [{
          Agents: [1],
          DeeplinkUrl: 'string',
          Price: 10,
          QuoteAgeInMinutes: 1,
        }]
      }],
      Legs: [{
        Arrival: 'string',
        Carriers: [2],
        Departure: '2019-08-28T10:25:00',
        DestinationStation: 2,
        Directionality: 'string',
        Duration: 10,
        FlightNumbers: [
          {
            CarrierId: 1,
            FlightNumber: 'string',
        }],
        JourneyMode: 'string',
        OperatingCarriers: [1],
        OriginStation: 2,
        SegmentIds: [1],
        Stops: [5],
    }],
      Places: [{
        Code: 'string',
        Id: 1,
        Name: 'string',
        ParentId: 1,
        Type: 'string',
    }],
      Query: {
        Adults: 1,
        CabinClass: 'string',
        Children: 0,
        Country: 'string',
        Currency: 'string',
        DestinationPlace: 'string',
        GroupPricing: false,
        Infants: 0,
        Locale: 'string',
        LocationSchema: 'string',
        OriginPlace: 'string',
        OutboundDate: 'string',
    },
      Segments: [{
        ArrivalDateTime: 'string',
        Carrier: 2,
        DepartureDateTime: 'string',
        DestinationStation: 1,
        Directionality: 'string',
        Duration: 5,
        FlightNumber: 'string',
        Id: 12,
        JourneyMode: 'string',
        OperatingCarrier: 1,
        OriginStation: 1,
    }],
      SessionKey: '12345678-5678-41b9-1234-0738650eb5c7',
      Status: 'UpdatesComplete'
    };
    const getPollSpy = of (spyOn(apiCallService, 'getPollSession').and.returnValue(of(getObsRespStub)));
    component.serviceCall();
    expect(component.resultArray.length).toEqual(31);
  });
});