import { LocalizationIdentifier } from 'src/app/domain/entities/localization-identifier';

export interface Localization {
  id: LocalizationIdentifier;
  name: string;
  icon: string;
  pathPrefix: string;
}
