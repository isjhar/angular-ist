import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { Localization } from 'src/app/domain/entities/localization';
import { LocalizationIdentifier } from 'src/app/domain/entities/localization-identifier';
import { LocalizationService } from 'src/app/pages/shared/localization.service';

@Component({
  selector: 'app-localization-menu',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, MatIconButton],
  templateUrl: './localization-menu.component.html',
  styleUrl: './localization-menu.component.scss',
})
export class LocalizationMenuComponent implements OnInit, OnDestroy {
  private _localizationService = inject(LocalizationService);
  private _currentLocalization: Localization | null = null;
  private _localizationsSubscription?: Subscription;
  private _currentLocalizationSubscription?: Subscription;

  localizations = signal<Localization[]>([]);

  currentLocalizationIcon = signal<string | null>(null);

  ngOnInit(): void {
    this._localizationsSubscription =
      this._localizationService.localizations$.subscribe((response) => {
        this.localizations.set(response);
      });

    this._currentLocalizationSubscription =
      this._localizationService.currentLocalization$.subscribe((response) => {
        this._currentLocalization = response;
        this.currentLocalizationIcon.set(this._currentLocalization.icon);
      });
  }

  ngOnDestroy(): void {
    this._localizationsSubscription?.unsubscribe();
    this._currentLocalizationSubscription?.unsubscribe();
  }

  setLocalization(localizationId: LocalizationIdentifier): void {
    this._localizationService.changeLocalization(localizationId);
  }
}
