import * as fs from 'fs';
import * as path from 'path';

import {IPackageJSON} from '../interfaces/ipackage.json';

import {CHARSET} from './../consts/files';
import {IDefaults} from '../interfaces/idefaults';
import {PATHS} from '../consts/paths';

export function ensureDir(dirname: string): void {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

export function getDefaultValues(): IDefaults {
  const defaults: IDefaults = require(path.join(PATHS.VSIX_DIR, 'defaults.json'));

  if (defaults === undefined || defaults === null) {
    throw new Error('Cannot find defaults params');
  }

  return defaults;
}

export function getAbsolutePath(input: string): string {
  return path.join(PATHS.VSIX_DIR, input);
}

export function getAccentsProperties() {
  return getDefaultValues().accentsProperties;
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
