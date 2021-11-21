import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorRequiredComponent } from './form-error-required.component';

describe('FormErrorRequiredComponent', () => {
  let component: FormErrorRequiredComponent;
  let fixture: ComponentFixture<FormErrorRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorRequiredComponent ]
    })
    .compileComponents();
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
