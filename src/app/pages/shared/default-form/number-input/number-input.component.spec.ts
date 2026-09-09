import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';

import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have unique id', () => {
    const fixture2 = TestBed.createComponent(NumberInputComponent);
    const component2 = fixture2.componentInstance;
    expect(component.id).not.toEqual(component2.id);
  });

  it('should set value', () => {
    component.writeValue(1000);
    expect(component.value).toBe(1000);
  });

  it('should set null value', () => {
    component.writeValue(null);
    expect(component.value).toBeNull();
    expect(component.empty).toBeTrue();
  });

  it('should be empty when value is null', () => {
    component.writeValue(null);
    expect(component.empty).toBeTrue();
  });

  it('should not be empty when value is set', () => {
    component.writeValue(500);
    expect(component.empty).toBeFalse();
  });

  it('should float label when focused', () => {
    component.focused = true;
    expect(component.shouldLabelFloat).toBeTrue();
  });

  it('should float label when value is set', () => {
    component.writeValue(100);
    expect(component.shouldLabelFloat).toBeTrue();
  });

  it('should call onChange when input changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);
    component.onInput({
      target: { value: '1,000' },
    } as unknown as Event);
    expect(onChangeSpy).toHaveBeenCalledWith(1000);
  });

  it('should call onTouched on focus out', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);
    component.onFocusOut({
      relatedTarget: null,
    } as unknown as FocusEvent);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });
});
