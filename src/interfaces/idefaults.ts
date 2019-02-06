import {IGenericObject} from './igeneric-object';
import {IAccentCustomProperty} from './iaccent-custom-property';

export interface IDefaults {
  accents: IAccents;
  accentsProperties: IGenericObject <IAccentCustomProperty>;
  changelog: IChangelog;
  themeVariants: IDefaultsThemeVariant;
  themeVariantsColours: IDefaultsThemeVariant;
  themeVariantsUITheme: IDefaultsThemeVariant;
  [Symbol.iterator](): IterableIterator<IDefaults>;
}

export interface IAccents {
  teal: string;
  [index: string]: string;
}

export interface IChangelog {
  lastversion: string;
  [Symbol.iterator](): IterableIterator<IChangelog>;
}

export interface IDefaultsThemeVariant {
  [index: string]: string;
  Darker: string;
  DarkerHighContrast: string;
  Default: string;
  DefaultHighContrast: string;
  Light: string;
  LightHighContrast: string;
  PalenightHighContrast: string;
  Ocean: string;
  OceanHighContrast: string;
}
