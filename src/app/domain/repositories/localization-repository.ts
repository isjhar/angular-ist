import { Observable } from 'rxjs';
import { Localization } from 'src/app/domain/entities/localization';
import { LocalizationIdentifier } from 'src/app/domain/entities/localization-identifier';

export interface LocalizationRepository {
  getLocalizations(): Observable<Localization[]>;
  getActiveLocalization(): Observable<Localization>;
  setActiveLocalization(
    localizationId: LocalizationIdentifier,
  ): Observable<void>;
  localizationValueChanges(): Observable<Localization>;
  changeLocalization(localizationId: LocalizationIdentifier): void;
  isPathPrefixSupported(pathPrefix: string): Observable<boolean>;
}
