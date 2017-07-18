import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpUtil from 'gulp-util';
import * as mustache from 'mustache';
import * as path from 'path';

import { HR, MESSAGE_GENERATED, MESSAGE_THEME_VARIANT_PARSE_ERROR } from './../consts/log';

import { CHARSET } from "../../extensions/consts/files";
import { IDefaults } from "../../extensions/interfaces/idefaults";
import { IThemeVariant } from './../interfaces/itheme-variant';
import paths from '../../extensions/consts/paths';

let commons: IDefaults = require('../../extensions/defaults.json');

let themeTemplateFileContent: string = fs.readFileSync(path.join(paths.SRC, `/themes/theme-template-color-theme.json`), CHARSET);
let themeVariants: IThemeVariant[] = [];

let fileNames: string[] = fs.readdirSync(path.join(paths.SRC, `./themes/settings/specific`));

// build theme variants for later use in templating
fileNames.forEach(fileName => {
  let filePath: string = path.join(paths.SRC, `./themes/settings/specific`, `./${fileName}`);
  let contents: string = fs.readFileSync(filePath, CHARSET);

  try {
    themeVariants.push(JSON.parse(contents));
  } catch (error) {
    gulpUtil.log(MESSAGE_THEME_VARIANT_PARSE_ERROR, error);
  }
});

/**
 * Themes task
 * Builds Themes
 */
export default gulp.task('build:themes', () => {
  gulpUtil.log(gulpUtil.colors.gray(HR));

  themeVariants.forEach(variant => {
    let filePath = path.join(paths.THEMES, `./${variant.name}.json`);
    let templateData = { commons, variant };
    let templateJSON: any = JSON.parse(mustache.render(themeTemplateFileContent, templateData));
    let templateJSONStringified: string = JSON.stringify(templateJSON, null, 2);

    fs.writeFileSync(filePath, templateJSONStringified, { encoding: CHARSET });

    gulpUtil.log(MESSAGE_GENERATED, gulpUtil.colors.green(filePath));
  });

  gulpUtil.log(gulpUtil.colors.gray(HR));
});
