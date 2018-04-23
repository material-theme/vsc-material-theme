import * as vscode from 'vscode';

import { IDefaults } from "../interfaces/idefaults";
import { IThemeCustomProperties } from "../interfaces/itheme-custom-properties";
import {getPackageJSON} from './fs';

/**
 * Gets saved accent
 * @export
 * @returns {(string | null)}
 */
export function getAccent(): string | undefined {
  return getCustomSettings().accent;
}

/**
 * Gets custom settings
 * @export
 * @returns {*}
 */
export function getCustomSettings(): IThemeCustomProperties {
  return vscode.workspace.getConfiguration().get<IThemeCustomProperties>('materialTheme.cache.workbench.settings', {});
}

/**
 * Checks if a given string could be an accent
 *
 * @export
 * @param {string} accentName
 * @returns {boolean}
 */
export function isAccent(accentName: string, defaults: IDefaults): boolean {
  return Object.keys(defaults.accents).filter(name => name === accentName).length > 0;
}

/**
 * Determines if the passing theme label is a material theme
 * @export
 * @param {string} themeName
 * @returns {boolean}
 */
export function isMaterialTheme(themeName: string): boolean {
  let packageJSON = getPackageJSON();
  return packageJSON.contributes.themes.filter(contrib => contrib.label === themeName).length > 0;
}

/**
 * Determines if the passing icons theme is a material theme
 * @export
 * @param {string} themeIconsName
 * @returns {boolean}
 */
export function isMaterialThemeIcons(themeIconsName: string): boolean {
  let packageJSON = getPackageJSON();
  return packageJSON.contributes.iconThemes.filter(contribute => contribute.id === themeIconsName).length > 0;
}

/**
 * Sets a custom property in custom settings
 * @export
 * @param {string} settingname
 * @param {*} value
 */
export function setCustomSetting(settingname: string, value: any): Thenable<void> {
  let settings: any = getCustomSettings();
  settings[settingname] = value;
  return vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.settings', settings, true);
}

/**
 * Sets custom properties in custom settings
 * @export
 * @param {*} settingsObject
 * @returns {Thenable<void>}
 */
export function setCustomSettings(settingsObject: IThemeCustomProperties): Thenable<void> {
  let settings: any = getCustomSettings();

  Object.keys(settingsObject).forEach(key => settings[key] = (settingsObject as any)[key]);

  return vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.settings', settings, true);
}

/**
 * Updates accent name
 * @export
 * @param {string} accentName
 */
export function updateAccent(accentName: string): Thenable<void> {
  const prevaccent = getAccent();
  return setCustomSetting('accentPrevious', prevaccent)
    .then(() => setCustomSetting('accent', accentName));
}