import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingScreenComponent } from './loading-screen.component';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { of } from 'rxjs';

describe('LoadingScreenComponent', () => {
  let component: LoadingScreenComponent;
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let loadingScreenService: LoadingScreenService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingScreenComponent ],
      providers: [LoadingScreenService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    loadingScreenService = TestBed.get(LoadingScreenService);
    component.loadingSubscription = loadingScreenService.loadingStatus.subscribe(val => val);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
    
  });
});