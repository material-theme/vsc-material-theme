import {IThemeCustomSettings} from '../../extensions/interfaces/itheme-custom-properties';
import {IDefaults} from '../../extensions/interfaces/idefaults';

export interface IChangeType {
  children: {
    text: String;
  }[];
}
export interface IPost {
  title: String;
  version: String;
  fixed: IChangeType[];
  new: IChangeType[];
  breaking: IChangeType[];
}
export interface IPostNormalized {
  title: String;
  version: String;
  fixed: String[];
  new: String[];
  breaking: String[];
}
export interface SettingsChangedMessage {
  type: 'settingsChanged';
  config: IThemeCustomSettings;
}

export interface SaveSettingsMessage {
  type: 'saveSettings';
  changes: {
      [key: string]: any;
  };
  removes: string[];
  scope: 'user' | 'workspace';
  uri: string;
}

export type Message = SaveSettingsMessage | SettingsChangedMessage;
export type Invalidates = 'all' | 'config' | undefined;

export interface Bootstrap {
  config: IThemeCustomSettings;
}

export interface SettingsBootstrap extends Bootstrap {
  scope: 'user' | 'workspace';
  scopes: ['user' | 'workspace', string][];
  defaults: IDefaults;
}

declare global {
  interface Window { bootstrap: Bootstrap | SettingsBootstrap | {}; }
}
