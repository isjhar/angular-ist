import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Localization } from 'src/app/domain/entities/localization';
import { LocalizationIdentifier } from 'src/app/domain/entities/localization-identifier';
import { LocalizationRepository } from 'src/app/domain/repositories/localization-repository';

@Injectable()
export class LocalLocalizationRepository implements LocalizationRepository {
  private _storageKey = 'localization';
  private _defaultLocalization = {
    id: LocalizationIdentifier.en,
    name: 'English',
    icon: '🇬🇧',
    pathPrefix: '',
  };
  private _localizations: Localization[] = [
    this._defaultLocalization,
    {
      id: LocalizationIdentifier.id,
      name: 'Bahasa Indonesia',
      icon: '🇮🇩',
      pathPrefix: 'id',
    },
  ];

  private _currentLocalization: BehaviorSubject<Localization>;

  constructor() {
    let currentLocalization = this._defaultLocalization;

    const storedLocaleValue = localStorage.getItem(this._storageKey);
    if (storedLocaleValue) {
      const storedLocaleEnum = Number(
        storedLocaleValue,
      ) as LocalizationIdentifier;

      const storedLocalization = this._localizations.find(
        (element) => element.id == storedLocaleEnum,
      );
      if (storedLocalization) {
        currentLocalization = storedLocalization;
      }
    }
    this._currentLocalization = new BehaviorSubject<Localization>(
      currentLocalization,
    );
  }

  getLocalizations(): Observable<Localization[]> {
    return new Observable<Localization[]>((observer) => {
      observer.next(this._localizations);
      observer.complete();
    });
  }

  getActiveLocalization(): Observable<Localization> {
    return new Observable<Localization>((observer) => {
      const storedLocaleValue = localStorage.getItem(this._storageKey);
      if (!storedLocaleValue) {
        observer.next(this._defaultLocalization);
      } else {
        const storedLocaleEnum = Number(
          storedLocaleValue,
        ) as LocalizationIdentifier;

        const storedLocalization = this._localizations.find(
          (element) => element.id == storedLocaleEnum,
        );
        if (!storedLocalization) {
          observer.next(this._defaultLocalization);
        } else {
          observer.next(storedLocalization);
        }
      }
      observer.complete();
    });
  }

  setActiveLocalization(
    localizationId: LocalizationIdentifier,
  ): Observable<void> {
    return new Observable<void>((observer) => {
      localStorage.setItem(this._storageKey, localizationId.toString());
      observer.next();
      observer.complete();
    });
  }

  localizationValueChanges(): Observable<Localization> {
    return this._currentLocalization;
  }

  changeLocalization(localizationId: LocalizationIdentifier): void {
    localStorage.setItem(this._storageKey, localizationId.toString());
    const localization = this._localizations.find(
      (element) => element.id == localizationId,
    );
    if (localization) {
      this._currentLocalization.next(localization);
    }
  }

  isPathPrefixSupported(pathPrefix: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      observer.next(
        this._localizations.some((x) => x.pathPrefix == pathPrefix),
      );
      observer.complete();
    });
  }
}
