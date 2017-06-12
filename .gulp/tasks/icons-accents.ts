import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as path from 'path';

import { IPackageJSON, IPackageJSONThemeIcons } from "../interfaces/ipackage.json";
import { MESSAGE_GENERATED, MESSAGE_ICON_ACCENTS_ERROR } from "../consts/log";

import { CHARSET } from "../consts/files";
import { IThemeConfigCommons } from '../../extensions/interfaces/icommons';
import { IThemeIconsAccents } from "../interfaces/itheme-icons-accents";
import PATHS from '../consts/paths'

const BASE_ICON_THEME_PATH: string = path.join(process.cwd(), PATHS.THEMES, './Material-Theme-Icons.json');
const THEME_COMMONS: IThemeConfigCommons = require('../../extensions/accents-setter/commons.json');
const PACKAGE_JSON: IPackageJSON = require('../../package.json');

const PACKAGE_JSON_ICON_THEME: IPackageJSONThemeIcons = {
  id: "material-theme-icons",
  label: "Material Theme Icons",
  path: "./themes/Material-Theme-Icons.json"
}

/**
 * Gets file path
 * @param {string} filename
 * @returns {string}
 */
function getFilepath(filename: string): string {
  return path.join(PATHS.THEMES, filename);
}

/**
 * Icon theme name
 * @param {string} accentName
 * @returns {string}
 */
function makefileName(accentName: string): string {
  return `./Material-Theme-Icons-${ accentName }.json`;
}

/**
 * Normalizes icon path
 * @param {string} iconPath
 * @returns {string}
 */
function normalizeIconPath(iconPath: string): string {
  return path.join(process.cwd(), PATHS.ICONS, iconPath);
}

/**
 * Replaces a file name with the accented filename
 * @param {string} name
 * @param {string} accentName
 * @returns {string}
 */
function replaceNameWithAccent(name: string, accentName: string): string {
  return name.replace('.svg', `.accent.${ accentName }.svg`);
}

/**
 * Replaces a SVG colour
 *
 * @param {string} filecontent
 * @param {string} colour
 * @returns {string}
 */
function replaceSVGColour(filecontent: string, colour: string): string {
  return filecontent.replace(/\.st0\s{0,}\{fill:#([a-zA-Z0-9]{6});\}/, ($0, $1) => $0.replace($1, colour));
}

/**
 * Replaces white spaces in accents' names
 * @param {string} input
 * @returns {string}
 */
function replaceWhiteSpaces(input: string): string {
  return input.replace(/\s+/g, '-');
}

/**
 * Writes a new svg file
 * @param {string} fromFile
 * @param {string} toFile
 * @param {string} accentColour
 */
function writeSVGIcon(fromFile: string, toFile: string, accent: string): void {
  let fileContent: string = fs.readFileSync(normalizeIconPath(fromFile), CHARSET);
  let content: string = replaceSVGColour(normalizeIconPath(fileContent), THEME_COMMONS.accents[accent]);
  toFile = normalizeIconPath(toFile);

  fs.writeFileSync(toFile, content);
}

// Exports task to index.ts
export default gulp.task('build:icons.accents', cb => {
  let basetheme: IThemeIconsAccents;

  PACKAGE_JSON.contributes.iconThemes = [ PACKAGE_JSON_ICON_THEME ];

  try {
    basetheme = require(BASE_ICON_THEME_PATH);

    Object.keys(THEME_COMMONS.accents).forEach(key => {
      let iconName = replaceWhiteSpaces(key);
      let themecopy: IThemeIconsAccents = JSON.parse(JSON.stringify(basetheme));
      let themePath: string = getFilepath(makefileName(key));

      themecopy.iconDefinitions._folder_open.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open.iconPath, iconName);
      themecopy.iconDefinitions._folder_open_build.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open_build.iconPath, iconName);

      writeSVGIcon(basetheme.iconDefinitions._folder_open.iconPath, themecopy.iconDefinitions._folder_open.iconPath, THEME_COMMONS.accents[key]);
      writeSVGIcon(basetheme.iconDefinitions._folder_open_build.iconPath, themecopy.iconDefinitions._folder_open_build.iconPath, THEME_COMMONS.accents[key]);

      fs.writeFileSync(themePath, JSON.stringify(themecopy));

      PACKAGE_JSON

      gutil.log(gutil.colors.green(MESSAGE_GENERATED, themePath));
    });

    fs.writeFileSync(path.join(process.cwd(), './package.test.json'), JSON.stringify(PACKAGE_JSON, null, 2), CHARSET);

  } catch (error) {
    // http://ragefaces.memesoftware.com/faces/large/misc-le-fu-l.png
    gutil.log(gutil.colors.red(MESSAGE_ICON_ACCENTS_ERROR));
    cb(error);
    return;
  }

  cb();
});