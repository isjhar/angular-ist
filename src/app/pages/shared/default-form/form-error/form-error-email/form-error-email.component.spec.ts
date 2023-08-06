import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { FormErrorEmailComponent } from './form-error-email.component';

describe('FormErrorEmailComponent', () => {
  let component: FormErrorEmailComponent;
  let fixture: ComponentFixture<FormErrorEmailComponent>;
  let formGroupDirectiveStub: Partial<FormGroupDirective> = {
    form: new UntypedFormGroup({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormErrorEmailComponent],
      providers: [
        { provide: FormGroupDirective, useValue: formGroupDirectiveStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
