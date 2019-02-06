import * as vscode from 'vscode';

import {IDefaults} from './../interfaces/idefaults';
import {IThemeCustomSettings} from './../interfaces/itheme-custom-properties';
import {getPackageJSON} from './fs';

/**
 * Gets saved accent
 */
export function getAccent(): string | undefined {
  return getCustomSettings().accent;
}

/**
 * Gets custom settings
 */
export function getCustomSettings(): IThemeCustomSettings {
  return vscode.workspace.getConfiguration().get<IThemeCustomSettings>('materialTheme', {});
}

/**
 * Get showReloadNotification
 */
export function isReloadNotificationEnable(): boolean {
  return vscode.workspace.getConfiguration().get<boolean>('materialTheme.showReloadNotification');
}

/**
 * Checks if a given string could be an accent
 */
export function isAccent(accentName: string, defaults: IDefaults): boolean {
  return Boolean(Object.keys(defaults.accents).find(name => name === accentName));
}

/**
 * Determines if the passing theme id is a material theme
 */
export function isMaterialTheme(themeName: string): boolean {
  const packageJSON = getPackageJSON();
  return Boolean(packageJSON.contributes.themes.find(contrib => contrib.label === themeName));
}

/**
 * Sets a custom property in custom settings
 */
export function setCustomSetting(settingName: string, value: any): Thenable<string> {
  return vscode.workspace.getConfiguration().update(`materialTheme.${settingName}`, value, true).then(() => settingName);
}

/**
 * Updates accent name
 */
export function updateAccent(accentName: string): Thenable<string> {
    return setCustomSetting('accent', accentName);
}
