import {getVariantIcons} from '../../extensions/helpers/fs';
import * as gulp from 'gulp';
import * as path from 'path';
import * as fs from 'fs';

import { CHARSET } from "../../extensions/consts/files";
import { IPackageJSON } from "../../extensions/interfaces/ipackage.json";
import { IThemeIconsVariants } from "../interfaces/itheme-icons-variants";
import PATHS from '../../extensions/consts/paths'
import { getDefaultValues } from "../../extensions/helpers/fs";
import { IDefaultsThemeVariantColours } from "../../extensions/interfaces/idefaults";
import { IThemeIconsItem } from '../interfaces/itheme-icons-item';

const PACKAGE_JSON: IPackageJSON = require(path.join(process.cwd(), './package.json'));

let variants: IDefaultsThemeVariantColours = getDefaultValues().themeVariantsColours;

function writeIconVariant(filepath: string, destpath: string, colour: string): void {
  let regexp = new RegExp('(#4a616c)', 'i')
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

        getVariantIcons().forEach(_iconName => {
          let basethemeIcon: IThemeIconsItem = (basetheme.iconDefinitions as any)[_iconName];
          let themeIcon: IThemeIconsItem = (theme.iconDefinitions as any)[_iconName];

          if (themeIcon !== undefined) {
            themeIcon.iconPath = themeIcon.iconPath.replace('.svg', `${ variantName }.svg`);
          }

          if (basethemeIcon !== undefined && themeIcon !== undefined) {
            writeIconVariant(basethemeIcon.iconPath, themeIcon.iconPath, variant);
          }
        });
      });
    });

  } catch (error) {
    callback(error);
    return;
  }

  callback();
});