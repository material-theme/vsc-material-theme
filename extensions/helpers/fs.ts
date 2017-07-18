import * as fs from 'fs'
import * as path from 'path'

import { IPackageJSON, IPackageJSONThemeIcons } from "../interfaces/ipackage.json";

import { CHARSET } from "../consts/files";
import { IDefaults } from "../interfaces/idefaults";
import { IThemeIcons } from "../interfaces/itheme-icons";
import { PATHS } from "../consts/paths";

/**
 * Gets default value
 * @export
 * @returns {IDefaults}
 */
export function getDefaultValues(): IDefaults {
  let defaults: IDefaults = require(path.join(PATHS.VSIX_DIR, './extensions/defaults.json'));

  if (defaults === undefined || defaults === null) {
    throw new Error('Cannot find defaults params');
  }

  return defaults;
}

/**
 * Gets an absolute path
 *
 * @export
 * @param {string} input
 * @returns {string}
 */
export function getAbsolutePath(input: string): string {
  return path.join(PATHS.VSIX_DIR, input);
}

/**
 * Gets a theme content by a given contribute ID
 *
 * @export
 * @param {string} ID
 * @returns {IThemeIcons}
 */
export function getThemeIconsByContributeID(ID: string): IThemeIcons | null {
  let contribute: IPackageJSONThemeIcons = getThemeIconsContribute(ID)
  return contribute !== null ? require(path.join(PATHS.VSIX_DIR, contribute.path)) : null;
}

/**
 * Gets a theme by name
 * @export
 * @param {string} name
 * @returns {IThemeIcons}
 */
export function getThemeIconsContribute(ID: string): IPackageJSONThemeIcons {
  let contributes = getPackageJSON().contributes.iconThemes.filter(contribute => contribute.id === ID);
  return contributes[0] !== undefined ? contributes[0] : null;
}

/**
 * Gets package JSON
 * @export
 * @returns {*}
 */
export function getPackageJSON(): IPackageJSON {
  let packageJSON: IPackageJSON = require(path.join(PATHS.VSIX_DIR, './package.json'));
  return packageJSON;
}

/**
 * Writes a file inside the vsix directory
 * @export
 * @param {string} filename
 * @param {string} filecontent
 */
export function writeFile(filename: string, filecontent: string): void {
  filename = path.join(PATHS.VSIX_DIR, filename);
  console.log(arguments)
  fs.writeFileSync(filename, filecontent, { encoding: CHARSET });
}