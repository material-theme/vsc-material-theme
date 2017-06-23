import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as path from 'path';

import { MESSAGE_GENERATED, MESSAGE_ICON_ACCENTS_ERROR } from "../consts/log";

import { CHARSET } from "../../extensions/consts/files";
import { IDefaults } from "../../extensions/interfaces/idefaults";
import { IThemeIconsAccents } from "../interfaces/itheme-icons-accents";
import PATHS from '../../extensions/consts/paths'

// import { IPackageJSON } from "../../extensions/interfaces/ipackage.json";
// import { writePackageJSON } from "../helpers/contribute-icon-theme";

const BASE_ICON_THEME_PATH: string = path.join(process.cwd(), PATHS.THEMES, './Material-Theme-Icons.json');
const DEFAULTS: IDefaults = require('../../extensions/defaults.json');
// const PACKAGE_JSON: IPackageJSON = require('../../package.json');

// const PACKAGE_JSON_ICON_THEME: IPackageJSONThemeIcons = {
//   id: "material-theme-icons",
//   label: "Material Theme Icons",
//   path: "./themes/Material-Theme-Icons.json"
// }

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
export function replaceSVGColour(filecontent: string, colour: string): string {
  return filecontent.replace(new RegExp('.st0\{fill:#([a-zA-Z0-9]{6})\}|path fill="#([a-zA-Z0-9]{6})"'), ($0, $1, $2) => {

    colour = colour.replace('#', '');

    if (!$2) {
      return $0.replace($1, colour);
    } else {
      return $0.replace($2, colour);
    }
  });
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
  let content: string = replaceSVGColour(fileContent, DEFAULTS.accents[accent]);
  toFile = normalizeIconPath(toFile);

  fs.writeFileSync(toFile, content);
}

// Exports task to index.ts
export default gulp.task('build:icons.accents', cb => {
  let basetheme: IThemeIconsAccents;

  // PACKAGE_JSON.contributes.iconThemes = [ PACKAGE_JSON_ICON_THEME ];

  try {
    basetheme = require(BASE_ICON_THEME_PATH);

    Object.keys(DEFAULTS.accents).forEach(key => {
      let iconName = replaceWhiteSpaces(key);
      let themecopy: IThemeIconsAccents = JSON.parse(JSON.stringify(basetheme));
      let themePath: string = path.join(PATHS.THEMES, `./Material-Theme-Icons-${ key }.json`);

      // let id: string = `${ PACKAGE_JSON_ICON_THEME.id }-${ key.replace(/\s+/g, '-').toLowerCase() }`;
      // let label: string = `${ PACKAGE_JSON_ICON_THEME.label } - ${ key } accent`;
      // let themepathJSON: string = `./${ themePath }`;

      themecopy.iconDefinitions._folder_open.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open.iconPath, iconName);
      themecopy.iconDefinitions._folder_open_build.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open_build.iconPath, iconName);

      writeSVGIcon(basetheme.iconDefinitions._folder_open.iconPath, themecopy.iconDefinitions._folder_open.iconPath, key);
      writeSVGIcon(basetheme.iconDefinitions._folder_open_build.iconPath, themecopy.iconDefinitions._folder_open_build.iconPath, key);

      // fs.writeFileSync(themePath, JSON.stringify(themecopy));

      // addContributeIconTheme(id, label, themepathJSON, PACKAGE_JSON);

      gutil.log(gutil.colors.green(MESSAGE_GENERATED, themePath));
    });

    // writePackageJSON(PACKAGE_JSON);

  } catch (error) {
    // http://ragefaces.memesoftware.com/faces/large/misc-le-fu-l.png
    gutil.log(gutil.colors.red(MESSAGE_ICON_ACCENTS_ERROR));
    cb(error);
    return;
  }

  cb();
});