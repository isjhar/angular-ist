import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonAppearance } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

export type ButtonAppearance = 'filled' | 'outlined' | 'ghost';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  imports: [MatButton, NgStyle, MatProgressSpinner, MatIcon],
  standalone: true,
})
export class LoadingButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() width: number | string = 100;
  @Input() appearance: MatButtonAppearance = 'filled';
  @Input() name?: string;
  @Input() value?: string;
  @Input() icon?: string;

  constructor() {}

  ngOnInit(): void {}
}
