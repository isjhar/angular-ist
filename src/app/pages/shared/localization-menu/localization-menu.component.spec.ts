import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationMenuComponent } from './localization-menu.component';

describe('LocalizationMenuComponent', () => {
  let component: LocalizationMenuComponent;
  let fixture: ComponentFixture<LocalizationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizationMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
