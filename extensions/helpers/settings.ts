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
  return vscode.workspace.getConfiguration().get<IThemeCustomProperties>('materialTheme', {});
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
 * @param {string} settingName
 * @param {*} value
 */
export function setCustomSetting(settingName: string, value: any): Thenable<void> {
  return vscode.workspace.getConfiguration().update(`materialTheme.${settingName}`, value, true);
}

/**
 * Updates accent name
 * @export
 * @param {string} accentName
 */
export function updateAccent(accentName: string): Thenable<void> {
  const prevAccent = getAccent();
  return setCustomSetting('accentPrevious', prevAccent)
    .then(() => setCustomSetting('accent', accentName))
}