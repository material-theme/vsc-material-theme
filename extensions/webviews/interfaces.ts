import {IThemeCustomSettings} from '../../extensions/interfaces/itheme-custom-properties';
import {IDefaults} from '../../extensions/interfaces/idefaults';

export interface IPost {
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

export interface ReleaseNotesBootstrap extends Bootstrap {
  something: 'something';
}

declare global {
  interface Window { bootstrap: Bootstrap | SettingsBootstrap; }
}
