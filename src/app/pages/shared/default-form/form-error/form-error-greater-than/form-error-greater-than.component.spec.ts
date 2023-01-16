import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorGreaterThanComponent } from './form-error-greater-than.component';

describe('FormErrorGreaterThanComponent', () => {
  let component: FormErrorGreaterThanComponent;
  let fixture: ComponentFixture<FormErrorGreaterThanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorGreaterThanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorGreaterThanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
