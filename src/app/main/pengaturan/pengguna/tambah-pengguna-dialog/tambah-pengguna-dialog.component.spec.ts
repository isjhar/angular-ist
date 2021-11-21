import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPenggunaDialogComponent } from './tambah-pengguna-dialog.component';

describe('TambahPenggunaDialogComponent', () => {
  let component: TambahPenggunaDialogComponent;
  let fixture: ComponentFixture<TambahPenggunaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahPenggunaDialogComponent ]
    })
    .compileComponents();
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
