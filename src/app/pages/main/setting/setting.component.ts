import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [RouterOutlet],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  standalone: true,
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
