import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityInHourComponent } from './user-activity-in-hour.component';

describe('UserActivityInHourComponent', () => {
  let component: UserActivityInHourComponent;
  let fixture: ComponentFixture<UserActivityInHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActivityInHourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivityInHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
