import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { FormErrorRequiredComponent } from './form-error-required.component';

describe('FormErrorRequiredComponent', () => {
  let component: FormErrorRequiredComponent;
  let fixture: ComponentFixture<FormErrorRequiredComponent>;
  let formGroupDirectiveStub: Partial<FormGroupDirective> = {
    form: new UntypedFormGroup({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormErrorRequiredComponent],
      providers: [
        { provide: FormGroupDirective, useValue: formGroupDirectiveStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
