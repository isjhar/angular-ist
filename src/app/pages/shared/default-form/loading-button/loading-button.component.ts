import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() width: number | string = 100;

  constructor() {}

  ngOnInit(): void {}
}
