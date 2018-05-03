import * as gulp from 'gulp';
import * as path from 'path';
import * as fs from 'fs';

import {IThemeIconsVariants} from '../interfaces/itheme-icons-variants';
import {CHARSET} from './../../extensions/consts/files';
import PATHS from './../../extensions/consts/paths';
import {getDefaultValues, getVariantIcons, getPackageJSON} from './../../extensions/helpers/fs';
import {IDefaultsThemeVariant} from './../../extensions/interfaces/idefaults';
import {IThemeIconsItem} from './../interfaces/itheme-icons-item';

const PACKAGE_JSON = getPackageJSON();

const variants: IDefaultsThemeVariant = getDefaultValues().themeVariantsColours;

const writeIconVariant = (filepath: string, destpath: string, colour: string): void => {
  const regexp = new RegExp('(#4a616c)', 'i');
  const finalFilePath = path.join(process.cwd(), PATHS.ICONS, filepath);
  const finalDestpath = path.join(process.cwd(), PATHS.ICONS, destpath);
  fs.writeFileSync(
    finalDestpath,
    fs.readFileSync(finalFilePath, CHARSET)
      .replace(regexp, ($0, $1) => $0.replace($1, colour)), {encoding: CHARSET}
  );
};

export default gulp.task('build:icons.variants', callback => {
  try {
    Object.keys(variants).forEach(variantName => {
      PACKAGE_JSON.contributes.iconThemes.forEach(contribute => {
        const regexpCheck: RegExp = new RegExp(Object.keys(variants).join('|'), 'i');

        if (regexpCheck.test(contribute.path) || regexpCheck.test(contribute.id)) {
          return;
        }

        const basepath: string = path.join(process.cwd(), contribute.path);
        const basetheme: IThemeIconsVariants = require(basepath);
        const theme: IThemeIconsVariants = JSON.parse(JSON.stringify(basetheme));
        const variant = variants[variantName];

        getVariantIcons().forEach(iconName => {
          const basethemeIcon: IThemeIconsItem = (basetheme.iconDefinitions as any)[iconName];
          const themeIcon: IThemeIconsItem = (theme.iconDefinitions as any)[iconName];

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
