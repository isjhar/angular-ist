import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorEmailComponent } from './form-error-email.component';

describe('FormErrorEmailComponent', () => {
  let component: FormErrorEmailComponent;
  let fixture: ComponentFixture<FormErrorEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorEmailComponent ]
    })
    .compileComponents();
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
