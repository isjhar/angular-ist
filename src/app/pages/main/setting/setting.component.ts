import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    standalone: false
})
export class SettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onTabChanged(event: any): void {
    switch (event.index) {
      case 0:
        break;
      case 1:
        break;
    }
  }
}
