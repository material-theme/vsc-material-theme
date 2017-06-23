export interface IDefaults {
  accents: IAccents;
  icons: IDefaultsThemeIcons;
  themeVariants: IDefaultsThemeVariant;
}

export interface IAccents {
  teal: string;
  [index: string]: string;
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
  Darker: string;
  Default: string;
  Light: string;
  Palenight: string;
}