import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorPasswordComponent } from './form-error-password.component';

describe('FormErrorPasswordComponent', () => {
  let component: FormErrorPasswordComponent;
  let fixture: ComponentFixture<FormErrorPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
