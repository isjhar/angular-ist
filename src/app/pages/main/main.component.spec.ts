import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

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
        MainComponent,
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
