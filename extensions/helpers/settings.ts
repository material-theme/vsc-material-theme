import * as vscode from 'vscode';

import { IThemeCustomProperties } from "../interfaces/itheme-custom-properties";
import { getPackageJSON } from "./fs";

/**
 * Gets saved accent
 * @export
 * @returns {(string | null)}
 */
export function getAccent(): string | null {
  return vscode.workspace.getConfiguration().get<string>('materialTheme.cache.workbench.accent', null);
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
 * Determines if the accent name has changed
 * @export
 * @param {string} accentName
 * @returns {boolean}
 */
export function hasAccentChanged(accentName: string): boolean {
  return accentName !== getAccent();
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
 * Sets custom properties in custom settings
 * @export
 * @param {string} settingname
 * @param {*} value
 */
export function setCustomSetting(settingname: string, value: any): void {
  let settings: any = getCustomSettings();
  settings[settingname] = value;
  vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.settings', settings, true);
}

/**
 * Determines if the window should reload
 * @export
 * @param {string} themeColour
 * @param {string} themeIcons
 * @returns {boolean}
 */
export function shouldReloadWindow(themeColour: string, themeIcons: string): boolean {
  let isTheme: boolean = isMaterialTheme(themeColour);
  let isThemeIcons: boolean = isMaterialThemeIcons(themeIcons);

  if (!isTheme && !isThemeIcons) return false;

  let customSettings = getCustomSettings();

  return customSettings.themeColours !== themeColour || customSettings.themeIcons !== themeIcons;
}

/**
 * Updates accent name
 * @export
 * @param {string} accentName
 */
export function updateAccent(accentName: string): void {
  vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.accent', accentName, true);
}

/**
 * Updates theme name to custom settings
 * @export
 * @param {string} themeName
 */
export function updateSettingsTheme(themeName: string): void {
  setCustomSetting('themeColours', themeName);
}

/**
 * Updates icons theme name to custom settings
 * @export
 * @param {string} themeName
 */
export function updateSettingsThemeIcons(themeName: string): void {
  setCustomSetting('themeIcons', themeName);
}