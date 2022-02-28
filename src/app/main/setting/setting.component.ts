import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor() {}

  isUserTabLoaded: boolean = true;

  ngOnInit(): void {}

  onTabChanged(event: any): void {
    switch (event.index) {
      case 0:
        this.isUserTabLoaded = true;
    }
  }
}
