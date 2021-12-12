import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { PengaturanModule } from '../../pengaturan.module';
import { UserService } from '../../user.service';

import { TambahPenggunaDialogComponent } from './tambah-pengguna-dialog.component';

describe('TambahPenggunaDialogComponent', () => {
  let component: TambahPenggunaDialogComponent;
  let fixture: ComponentFixture<TambahPenggunaDialogComponent>;
  let userServiceSpy;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getRoles']);
    userServiceSpy.getRoles.and.returnValue(of());
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatChipsModule,
        DefaultFormModule,
        PengaturanModule,
        BrowserAnimationsModule,
      ],
      declarations: [TambahPenggunaDialogComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahPenggunaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
