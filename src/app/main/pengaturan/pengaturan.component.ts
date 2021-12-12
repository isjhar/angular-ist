import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.component.html',
  styleUrls: ['./pengaturan.component.scss'],
})
export class PengaturanComponent implements OnInit {
  constructor() {}

  isPenggunaTabLoaded: boolean = true;

  ngOnInit(): void {}

  onTabChanged(event: any): void {
    switch (event.index) {
      case 0:
        this.isPenggunaTabLoaded = true;
    }
  }
}
