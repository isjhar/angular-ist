import { inject, Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { LOCALIZATION_REPOSITORY } from 'src/app/app-local-repository';
import { Localization } from 'src/app/domain/entities/localization';
import { LocalizationIdentifier } from 'src/app/domain/entities/localization-identifier';
import { LocalizationRepository } from 'src/app/domain/repositories/localization-repository';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private _currentLocalization = new BehaviorSubject<Localization>(
    {} as Localization,
  );
  private _localizations = new BehaviorSubject<Localization[]>([]);
  private _localizationRepository = inject<LocalizationRepository>(
    LOCALIZATION_REPOSITORY,
  );

  currentLocalization$ = this._currentLocalization.asObservable();
  localizations$ = this._localizations.asObservable();

  constructor() {
    this._localizationRepository.getLocalizations().subscribe((response) => {
      this._localizations.next(response);
      this._localizationRepository
        .getActiveLocalization()
        .subscribe((localization) => {
          this._currentLocalization.next(localization);
        });
    });
  }

  changeLocalization(localizationId: LocalizationIdentifier): void {
    this._localizationRepository
      .setActiveLocalization(localizationId)
      .subscribe((_) => {
        const localization = this._localizations.value.find(
          (element) => element.id == localizationId,
        );
        if (localization) {
          this._currentLocalization.next(localization);
        }

        this.getRedirectPath().subscribe((redirectPath) => {
          if (redirectPath) {
            this.redirectToPath(redirectPath);
          }
        });
      });
  }

  getRedirectPath(): Observable<string | null> {
    if (isDevMode()) {
      return of(null);
    }

    const currentPath = window.location.pathname;
    const currentPathSegments = currentPath
      .split('/')
      .filter((s) => s.length > 1);

    if (currentPathSegments.length == 0) {
      return of(null);
    }

    const currentLocale = currentPathSegments[0]; // e.g., 'en'
    const localization = this._currentLocalization.value;
    return this._localizationRepository
      .isPathPrefixSupported(currentLocale)
      .pipe(
        map<boolean, string | null>((isPathPrefixSupported) => {
          if (
            isPathPrefixSupported &&
            currentLocale != localization.pathPrefix
          ) {
            let newPath: string;

            if (currentLocale) {
              // Replace existing locale (e.g., /en/home -> /es/home)
              if (localization.pathPrefix) {
                newPath = currentPath.replace(
                  `/${currentLocale}/`,
                  `/${localization.pathPrefix}/`,
                );
              } else {
                newPath = currentPath.replace(`/${currentLocale}/`, ``);
              }
            } else {
              newPath = `/${localization.pathPrefix}${currentPath}`;
            }

            return newPath;
          }
          return null;
        }),
      );
  }

  redirectToPath(path: string): void {
    window.location.href = path;
  }
}
