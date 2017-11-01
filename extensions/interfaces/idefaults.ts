export interface IDefaults {
  accents: IAccents;
  accentableIcons: string[];
  changelog: IChangelog;
  icons: IDefaultsThemeIcons;
  themeVariants: IDefaultsThemeVariant;
  themeVariantsColours: IDefaultsThemeVariantColours;
  themeVariantsUITheme: IDefaultsThemeVariantUITheme;
  variantsIcons: string[];
}

export interface IAccents {
  teal: string;
  [index: string]: string;
}

export interface IChangelog {
  lastversion: string;
}

export interface IDefaultsThemeIcons {
  theme: {
    iconDefinitions: {
      _folder_open: {
        iconPath: string;
      }
      _folder_open_build: {
        iconPath: string;
      }
      _folder_dark: {
        iconPath: string;
      }
      _folder_dark_build: {
        iconPath: string;
      }
      "_folder_light_build": {
        iconPath: string;
      }
      _folder_light: {
        iconPath: string;
      }
    }
  }
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
}

export interface IDefaultsThemeVariantColours extends IDefaultsThemeVariant {

}

export interface IDefaultsThemeVariantUITheme extends IDefaultsThemeVariant {

}