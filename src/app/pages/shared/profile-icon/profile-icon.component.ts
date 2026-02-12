import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  imports: [NgStyle],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.scss',
})
export class ProfileIconComponent {
  @Input() src?: string;
  @Input() name: string = '';
  @Input() size: number = 50;

  get displayAbbrevationName(): string {
    if (this.name.length == 1) {
      return this.name[0].toUpperCase();
    }

    const tokens = this.name.split(' ');

    if (tokens.length == 1) {
      return this.name.substring(0, 2).toUpperCase();
    }

    return tokens
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
