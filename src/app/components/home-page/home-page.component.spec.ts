import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NgbModule, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { HomeComponent } from './home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { from, observable, of } from 'rxjs';
import { ApiCallService } from 'src/app/services/api.call.service';

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
    component.serviceCall();
  });
});