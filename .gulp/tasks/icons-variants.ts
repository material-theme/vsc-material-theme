import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';

import { CHARSET } from "../../extensions/consts/files";
import { IPackageJSON } from "../../extensions/interfaces/ipackage.json";
import { IThemeIconsVariants } from "../interfaces/itheme-icons-variants";
import PATHS from '../../extensions/consts/paths'
import { getDefaultValues } from "../../extensions/helpers/fs";
import { IDefaultsThemeVariantColours } from "../../extensions/interfaces/idefaults";

const PACKAGE_JSON: IPackageJSON = require(path.join(process.cwd(), './package.json'));

let variants: IDefaultsThemeVariantColours = getDefaultValues().themeVariantsColours;

function writeIconVariant(filepath: string, destpath: string, colour: string): void {
  let regexp = new RegExp('.st0\{fill:(#[a-zA-Z0-9]{3,6})')

  filepath = path.join(process.cwd(), PATHS.ICONS, filepath);
  destpath = path.join(process.cwd(), PATHS.ICONS, destpath);
  fs.writeFileSync(destpath, fs.readFileSync(filepath, CHARSET).replace(regexp, ($0, $1) => $0.replace($1, colour)), { encoding: CHARSET }) ;
}


export default gulp.task('build:icons.variants', callback => {
  try {
    Object.keys(variants).forEach(variantName => {
      PACKAGE_JSON.contributes.iconThemes.forEach(contribute => {
        let regexpCheck: RegExp = new RegExp(Object.keys(variants).join('|'), 'i');

        if (regexpCheck.test(contribute.path) || regexpCheck.test(contribute.id)) return;

        let basepath: string = path.join(process.cwd(), contribute.path);
        let basetheme: IThemeIconsVariants = require(basepath);
        let theme: IThemeIconsVariants = JSON.parse(JSON.stringify(basetheme));
        let variant = variants[variantName];

        theme.iconDefinitions._folder_dark.iconPath = theme.iconDefinitions._folder_dark.iconPath.replace('.svg', `${ variantName }.svg`);
        theme.iconDefinitions._file_folder.iconPath = theme.iconDefinitions._file_folder.iconPath.replace('.svg', `${ variantName }.svg`);
        theme.iconDefinitions["_file_folder-build"].iconPath = theme.iconDefinitions["_file_folder-build"].iconPath.replace('.svg', `${ variantName }.svg`);

        writeIconVariant(basetheme.iconDefinitions._folder_dark.iconPath, theme.iconDefinitions._folder_dark.iconPath, variant);
        writeIconVariant(basetheme.iconDefinitions._file_folder.iconPath, theme.iconDefinitions._file_folder.iconPath, variant);
        writeIconVariant(basetheme.iconDefinitions["_file_folder-build"].iconPath, theme.iconDefinitions["_file_folder-build"].iconPath, variant);
      });
    });

  } catch (error) {
    callback(error);
    return;
  }

  callback();
});