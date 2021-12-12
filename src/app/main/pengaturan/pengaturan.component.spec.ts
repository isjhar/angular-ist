import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';

import { PengaturanComponent } from './pengaturan.component';
import { PengaturanModule } from './pengaturan.module';

describe('PengaturanComponent', () => {
  let component: PengaturanComponent;
  let fixture: ComponentFixture<PengaturanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PengaturanModule,
        DefaultTableModule,
        MatFormFieldModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [PengaturanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
