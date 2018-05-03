import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as path from 'path';

import {MESSAGE_GENERATED, MESSAGE_ICON_ACCENTS_ERROR} from './../consts/log';

import {CHARSET} from './../../extensions/consts/files';
import {IThemeIconsAccents} from './../interfaces/itheme-icons-accents';
import PATHS from './../../extensions/consts/paths';
import {IThemeIconsItem} from './../interfaces/itheme-icons-item';
import {getAccentableIcons, getDefaultValues} from './../../extensions/helpers/fs';

const BASE_ICON_THEME_PATH: string = path.join(process.cwd(), PATHS.THEMES, './Material-Theme-Icons.json');
const DEFAULTS = getDefaultValues();

/**
 * Normalizes icon path
 */
function normalizeIconPath(iconPath: string): string {
  return path.join(process.cwd(), PATHS.ICONS, iconPath);
}

/**
 * Replaces a file name with the accented filename
 */
function replaceNameWithAccent(name: string, accentName: string): string {
  return name.replace('.svg', `.accent.${ accentName }.svg`);
}

/**
 * Replaces a SVG colour
 */
export function replaceSVGColour(filecontent: string, colour: string): string {
  return filecontent.replace(new RegExp('#(80CBC4)', 'i'), ($0, $1) => {
    const newColour = colour.replace('#', '');
    console.log(`Replacing colour ${ $1 } with ${ newColour }`);
    return $0.replace($1, newColour);
  });
}

/**
 * Replaces white spaces in accents' names
 */
function replaceWhiteSpaces(input: string): string {
  return input.replace(/\s+/g, '-');
}

/**
 * Writes a new svg file
 */
function writeSVGIcon(fromFile: string, toFile: string, accent: string): void {
  const fileContent: string = fs.readFileSync(normalizeIconPath(fromFile), CHARSET);
  const content: string = replaceSVGColour(fileContent, DEFAULTS.accents[accent]);
  const pathToFile = normalizeIconPath(toFile);

  gutil.log(gutil.colors.gray(`Accented icon ${pathToFile} created with colour ${ accent } (${ DEFAULTS.accents[accent] })`));

  fs.writeFileSync(pathToFile, content);
}

// Exports task to index.ts
export default gulp.task('build:icons.accents', cb => {
  let basetheme: IThemeIconsAccents;

  try {
    basetheme = require(BASE_ICON_THEME_PATH);

    Object.keys(DEFAULTS.accents).forEach(key => {
      const iconName = replaceWhiteSpaces(key);
      const themecopy: IThemeIconsAccents = JSON.parse(JSON.stringify(basetheme));
      const themePath: string = path.join(PATHS.THEMES, `./Material-Theme-Icons-${ key }.json`);

      getAccentableIcons().forEach(accentableIconName => {
        gutil.log(gutil.colors.gray(`Preparing ${ accentableIconName } accented icon`));

        const iconOriginDefinition: IThemeIconsItem = (basetheme.iconDefinitions as any)[accentableIconName];
        const iconCopyDefinition: IThemeIconsItem = (themecopy.iconDefinitions as any)[accentableIconName];

        if (iconOriginDefinition !== undefined && typeof iconOriginDefinition.iconPath === 'string' && iconCopyDefinition !== undefined && typeof iconCopyDefinition.iconPath === 'string') {
          iconCopyDefinition.iconPath = replaceNameWithAccent(iconOriginDefinition.iconPath, iconName);
          writeSVGIcon(iconOriginDefinition.iconPath, iconCopyDefinition.iconPath, key);
        } else {
          gutil.log(gutil.colors.yellow(`Icon ${ accentableIconName } not found`));
        }
      });

      // themecopy.iconDefinitions._folder_open.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open.iconPath, iconName);
      // themecopy.iconDefinitions._folder_open_build.iconPath = replaceNameWithAccent(basetheme.iconDefinitions._folder_open_build.iconPath, iconName);

      // writeSVGIcon(basetheme.iconDefinitions._folder_open.iconPath, themecopy.iconDefinitions._folder_open.iconPath, key);
      // writeSVGIcon(basetheme.iconDefinitions._folder_open_build.iconPath, themecopy.iconDefinitions._folder_open_build.iconPath, key);

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
