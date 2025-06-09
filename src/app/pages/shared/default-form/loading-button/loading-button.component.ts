import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  imports: [MatButton, NgStyle, MatProgressSpinner],
  standalone: true,
})
export class LoadingButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() width: number | string = 100;

  constructor() {}

  ngOnInit(): void {}
}
