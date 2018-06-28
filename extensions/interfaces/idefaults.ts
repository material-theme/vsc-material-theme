import {IGenericObject} from './igeneric-object';
import {IAccentCustomProperty} from './iaccent-custom-property';

export interface IDefaults {
  accents: IAccents;
  accentsProperties: IGenericObject <IAccentCustomProperty>;
  accentableIcons: string[];
  changelog: IChangelog;
  icons: IDefaultsThemeIcons;
  themeVariants: IDefaultsThemeVariant;
  themeIconVariants: IDefaultsThemeIconVariant;
  themeVariantsColours: IDefaultsThemeVariant;
  themeVariantsUITheme: IDefaultsThemeVariant;
  variantsIcons: string[];
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

export interface IDefaultsThemeIcons {
  theme: {
    iconDefinitions: {
      _folder_open: {
        iconPath: string;
      };
      _folder_open_build: {
        iconPath: string;
      };
      _folder_dark: {
        iconPath: string;
      };
      _folder_dark_build: {
        iconPath: string;
      };
      _folder_light_build: {
        iconPath: string;
      };
      _folder_light: {
        iconPath: string;
      };
    };
  };
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

export interface IDefaultsThemeIconVariant {
  [index: string]: string;
  Darker: string;
  Light: string;
  Palenight: string;
  Ocean: string;
}
