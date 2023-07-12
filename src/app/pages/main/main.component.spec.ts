import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let authServiceStub;
  let breakPointObserverStub;

  beforeEach(async () => {
    breakPointObserverStub = jasmine.createSpyObj(['observe']);
    breakPointObserverStub.observe.and.returnValue(of(true));

    authServiceStub = jasmine.createSpyObj(['getUser']);

    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: BreakpointObserver, useValue: breakPointObserverStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
