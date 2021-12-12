import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DefaultTableComponent } from 'src/app/shared/default-table/default-table.component';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { UserService } from '../user.service';

import { PenggunaComponent } from './pengguna.component';

describe('PenggunaComponent', () => {
  let component: PenggunaComponent;
  let fixture: ComponentFixture<PenggunaComponent>;
  let userServiceStub;
  let matDialogStub: Partial<MatDialog> = {};

  beforeEach(async () => {
    userServiceStub = jasmine.createSpyObj('UserService', ['getUsers']);
    userServiceStub.getUsers.and.returnValue(of());
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, DefaultTableModule, BrowserAnimationsModule],
      declarations: [PenggunaComponent, DefaultTableComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: MatDialog, useValue: matDialogStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenggunaComponent);
    component = fixture.componentInstance;
    component.table = TestBed.createComponent(
      DefaultTableComponent
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
