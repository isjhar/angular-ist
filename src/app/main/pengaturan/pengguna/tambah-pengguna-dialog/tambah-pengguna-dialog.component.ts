import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tambah-pengguna-dialog',
  templateUrl: './tambah-pengguna-dialog.component.html',
  styleUrls: ['./tambah-pengguna-dialog.component.scss'],
})
export class TambahPenggunaDialogComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmitted(): void {
    console.log('test');
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'Kolom harus diisi';
    }

    if (this.email.hasError('required')) {
      return 'Kolom harus diisi';
    } else if (this.email.hasError('email')) {
      return 'Email tidak valid';
    }
    return '';
  }
}
