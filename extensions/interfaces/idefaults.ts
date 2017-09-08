export interface IDefaults {
  accents: IAccents;
  changelog: IChangelog;
  icons: IDefaultsThemeIcons;
  themeVariants: IDefaultsThemeVariant;
  themeVariantsColours: IDefaultsThemeVariantColours;
  themeVariantsUITheme: IDefaultsThemeVariantUITheme;
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
      "_file_folder-build": {
        iconPath: string;
      }
      _file_folder: {
        iconPath: string;
      }
    }
  }
}

export interface IDefaultsThemeVariant {
  [index: string]: string;
  Darker: string;
  Default: string;
  Light: string;
  Palenight: string;
}

export interface IDefaultsThemeVariantColours extends IDefaultsThemeVariant {

}

export interface IDefaultsThemeVariantUITheme extends IDefaultsThemeVariant {

}