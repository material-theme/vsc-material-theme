import * as fs from 'fs';
import * as path from 'path';

import {IPackageJSON, IPackageJSONThemeIcons} from './../interfaces/ipackage.json';

import {CHARSET} from './../consts/files';
import {IDefaults} from '../interfaces/idefaults';
import {IThemeIcons} from '../interfaces/itheme-icons';
import {PATHS} from '../consts/paths';

export function ensureDir(dirname: string): void {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

export function getDefaultValues(): IDefaults {
  const defaults: IDefaults = require(path.join(PATHS.VSIX_DIR, './extensions/defaults.json'));

  if (defaults === undefined || defaults === null) {
    throw new Error('Cannot find defaults params');
  }

  return defaults;
}

export function getAbsolutePath(input: string): string {
  return path.join(PATHS.VSIX_DIR, input);
}

export function getAccentableIcons(): string[] {
  return getDefaultValues().accentableIcons;
}

export function getVariantIcons(): string[] {
  return getDefaultValues().variantsIcons;
}

export function getAccentsProperties() {
  return getDefaultValues().accentsProperties;
}

/**
 * Gets a theme content by a given contribute ID
 */
export function getThemeIconsByContributeID(ID: string): IThemeIcons | null {
  const contribute: IPackageJSONThemeIcons = getThemeIconsContribute(ID);
  return contribute !== null ? require(path.join(PATHS.VSIX_DIR, contribute.path)) : null;
}

/**
 * Gets a theme by name
 */
export function getThemeIconsContribute(ID: string): IPackageJSONThemeIcons {
  const contributes = getPackageJSON().contributes.iconThemes.filter(contribute => contribute.id === ID);
  return contributes[0] !== undefined ? contributes[0] : null;
}

/**
 * Icon variant name from theme name
 */
export function getIconVariantFromTheme(theme: string): string {
  const {themeIconVariants} = getDefaultValues();
  const found = Object.keys(themeIconVariants).find(variant => theme.includes(variant));
  return found ? found.toLowerCase() : null;
}

/**
 * Gets package JSON
 */
export function getPackageJSON(): IPackageJSON {
  return require(path.join(PATHS.VSIX_DIR, './package.json'));
}

/**
 * Writes a file inside the vsix directory
 */
export function writeFile(filename: string, filecontent: string): void {
  const filePath = path.join(PATHS.VSIX_DIR, filename);
  fs.writeFileSync(filePath, filecontent, {encoding: CHARSET});
}
