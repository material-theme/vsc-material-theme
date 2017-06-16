import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';

import { addContributeIconTheme, writePackageJSON } from "../helpers/contribute-icon-theme";

import { CHARSET } from "../consts/files";
import { IGenericObject } from "../../extensions/interfaces/igeneric-object";
import { IPackageJSON } from "../interfaces/ipackage.json";
import { IThemeIconsVariants } from "../interfaces/itheme-icons-variants";
import PATHS from '../../extensions/consts/paths'

const PACKAGE_JSON: IPackageJSON = require(path.join(process.cwd(), './package.json'));

let variants: IGenericObject<string> = {
  Darker: '#424242',
  Default: '#4A616C',
  Light: '#90A4AE',
  Palenight: '#4E5579'
}

function writeIconVariant(filepath: string, destpath: string, colour: string): void {
  let regexp = new RegExp('.st0\{opacity:.16;fill:(#[a-zA-Z0-9]{3,6})')

  filepath = path.join(process.cwd(), PATHS.ICONS, filepath);
  destpath = path.join(process.cwd(), PATHS.ICONS, destpath);
  fs.writeFileSync(destpath, fs.readFileSync(filepath, CHARSET).replace(regexp, ($0, $1) => $0.replace($1, colour)), CHARSET) ;
}


export default gulp.task('build:icons.variants', callback => {
  try {
    Object.keys(variants).forEach(variantName => {
      PACKAGE_JSON.contributes.iconThemes.forEach(contribute => {
        let regexpCheck: RegExp = new RegExp(Object.keys(variants).join('|'), 'i');

        if (regexpCheck.test(contribute.path) || regexpCheck.test(contribute.id)) return;

        let basepath: string = path.join(process.cwd(), contribute.path);
        let basetheme: IThemeIconsVariants = require(basepath);
        let themepath: string = path.join(process.cwd(), contribute.path.replace('.json', `.${ variantName }.json`));
        let theme: IThemeIconsVariants = JSON.parse(JSON.stringify(basetheme));

        let contributeID: string = `${ contribute.id }-${ variantName.toLowerCase() }`;
        let contributeLabel: string = `${ contribute.label } - ${ variantName }`
        let contributePath: string = path.relative(process.cwd(), themepath);

        theme.iconDefinitions._folder_dark.iconPath = theme.iconDefinitions._folder_dark.iconPath.replace('.svg', `${ variantName }.svg`);
        theme.iconDefinitions._file_folder.iconPath = theme.iconDefinitions._file_folder.iconPath.replace('.svg', `${ variantName }.svg`);
        theme.iconDefinitions["_file_folder-build"].iconPath = theme.iconDefinitions["_file_folder-build"].iconPath.replace('.svg', `${ variantName }.svg`);

        fs.writeFileSync(themepath, JSON.stringify(theme), CHARSET);

        writeIconVariant(basetheme.iconDefinitions._folder_dark.iconPath, theme.iconDefinitions._folder_dark.iconPath, variants[variantName]);
        writeIconVariant(basetheme.iconDefinitions._file_folder.iconPath, theme.iconDefinitions._file_folder.iconPath, variants[variantName]);
        writeIconVariant(basetheme.iconDefinitions["_file_folder-build"].iconPath, theme.iconDefinitions["_file_folder-build"].iconPath, variants[variantName]);

        addContributeIconTheme(contributeID, contributeLabel, contributePath, PACKAGE_JSON);
      });
    });

    writePackageJSON(PACKAGE_JSON);

  } catch (error) {
    callback(error);
    return;
  }

  callback();
});