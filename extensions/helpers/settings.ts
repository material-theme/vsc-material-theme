import * as vscode from 'vscode';

import {IDefaults} from './../interfaces/idefaults';
import {IThemeCustomProperties} from './../interfaces/itheme-custom-properties';
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
export function getCustomSettings(): IThemeCustomProperties {
  return vscode.workspace.getConfiguration().get<IThemeCustomProperties>('materialTheme', {});
}

/**
 * Get autoApplyIcons
 */
export function isAutoApplyEnable(): boolean {
  return vscode.workspace.getConfiguration().get<boolean>('materialTheme.autoApplyIcons', true);
}

/**
 * Checks if a given string could be an accent
 */
export function isAccent(accentName: string, defaults: IDefaults): boolean {
  return Boolean(Object.keys(defaults.accents).find(name => name === accentName));
}

/**
 * Determines if the passing theme label is a material theme
 */
export function isMaterialTheme(themeName: string): boolean {
  const packageJSON = getPackageJSON();
  return Boolean(packageJSON.contributes.themes.find(contrib => contrib.label === themeName));
}

/**
 * Determines if the passing icons theme is a material theme
 */
export function isMaterialThemeIcons(themeIconsName: string): boolean {
  const packageJSON = getPackageJSON();
  return Boolean(packageJSON.contributes.iconThemes.find(contribute => contribute.id === themeIconsName));
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
  const prevAccent = getAccent();
  return setCustomSetting('accentPrevious', prevAccent)
    .then(() => setCustomSetting('accent', accentName));
}
