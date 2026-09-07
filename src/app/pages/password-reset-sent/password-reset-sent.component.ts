import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationMenuComponent } from '../shared/localization-menu/localization-menu.component';

@Component({
  selector: 'app-password-reset-sent',
  imports: [LocalizationMenuComponent, RouterLink],
  templateUrl: './password-reset-sent.component.html',
  styleUrl: './password-reset-sent.component.scss',
})
export class PasswordResetSentComponent {}
