import {IGenericObject} from './../../extensions/interfaces/igeneric-object';

export interface IPackageJSONBadge {
  description: string;
  href: string;
  url: string;
}

export interface IPackageJSONContributes {
  commands: IPackageJSONCommand[];
  configuration: IPackageJSONConfiguration;
  iconThemes: IPackageJSONThemeIcons[];
  themes: IPackageJSONTheme[];
}

export interface IPackageJSONConfiguration {
  properties: {};
}

export interface IPackageJSONCommand {
  category: string;
  command: string;
  title: string;
}

export interface IPackageJSONTheme {
  label: string;
  path: string;
  uiTheme: string;
}

export interface IPackageJSONThemeIcons {
  id: string;
  label: string;
  path: string;
}

export interface IPackageJSON {
  activationEvents: string[];
  badges: IPackageJSONBadge[];
  contributes: IPackageJSONContributes;
  bugs: IGenericObject<string>;
  categories: string[];
  description: string;
  displayName: string;
  engines: IGenericObject<string>;
  galleryBanner: IGenericObject<string>;
  homepage: string;
  icon: string;
  license: string;
  main: string;
  name: string;
  preview: boolean;
  publisher: string;
  repository: IGenericObject<string>;
  scripts: IGenericObject<string>;
  version: string;
  devDependencies: IGenericObject<string>;
}
