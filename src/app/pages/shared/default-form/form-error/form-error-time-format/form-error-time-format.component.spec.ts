import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorTimeFormatComponent } from './form-error-time-format.component';

describe('FormErrorTimeFormatComponent', () => {
  let component: FormErrorTimeFormatComponent;
  let fixture: ComponentFixture<FormErrorTimeFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorTimeFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorTimeFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
