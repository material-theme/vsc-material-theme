import * as fs from 'fs'
import * as path from 'path'

import { IPackageJSON, IPackageJSONThemeIcons } from "../interfaces/ipackage.json";

import { CHARSET } from "../consts/files";

/**
 * @export
 * @param {string} id
 * @param {string} label
 * @param {string} path
 * @param {IPackageJSON} topackage
 * @returns {IPackageJSON}
 */
export function addContributeIconTheme(id: string, label: string, path: string, topackage: IPackageJSON): IPackageJSON {
  let contribute: IPackageJSONThemeIcons = { id, label, path };

  if (id === null || id === undefined) {
    throw new TypeError(`addContributeIconTheme: variable id must be a string, got ${ Object.prototype.toString.call(id) }`);
  }

  if (label === null || label === undefined) {
    throw new TypeError(`addContributeIconTheme: variable label must be a string, got ${ Object.prototype.toString.call(label) }`);
  }

  if (path === null || path === undefined) {
    throw new TypeError(`addContributeIconTheme: variable path must be a string, got ${ Object.prototype.toString.call(path) }`);
  }

  if (topackage === null || topackage === undefined) {
    throw new TypeError(`addContributeIconTheme: variable topackage must be a string, got ${ Object.prototype.toString.call(topackage) }`);
  }

  topackage.contributes.iconThemes.push(contribute);

  return topackage;
}

/**
 * @export
 * @param {IPackageJSON} packageJSON
 */
export function writePackageJSON(packageJSON: IPackageJSON): void {
  fs.writeFileSync(path.join(process.cwd(), './package.json'), JSON.stringify(packageJSON, null, 2), CHARSET);
}