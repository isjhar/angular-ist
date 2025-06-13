import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrendsComponent } from './user-trends.component';

describe('UserTrendsComponent', () => {
  let component: UserTrendsComponent;
  let fixture: ComponentFixture<UserTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
