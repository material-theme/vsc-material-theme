import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpUtil from 'gulp-util';
import * as mustache from 'mustache';
import * as path from 'path';

import {HR, MESSAGE_GENERATED, MESSAGE_THEME_VARIANT_PARSE_ERROR} from './../consts/log';

import {CHARSET} from './../../extensions/consts/files';
import {IThemeVariant} from './../interfaces/itheme-variant';
import paths from './../../extensions/consts/paths';
import {ensureDir, getDefaultValues} from './../../extensions/helpers/fs';

const commons = getDefaultValues();

const themeTemplateFileContent: string = fs.readFileSync(path.join(paths.SRC, '/themes/theme-template-color-theme.json'), CHARSET);
const themeVariants: IThemeVariant[] = [];

const fileNames: string[] = fs.readdirSync(path.join(paths.SRC, './themes/settings/specific'));

// build theme variants for later use in templating
fileNames.forEach(fileName => {
  const filePath: string = path.join(paths.SRC, './themes/settings/specific', `./${fileName}`);
  const contents: string = fs.readFileSync(filePath, CHARSET);

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
export default gulp.task('build:themes', cb => {
  gulpUtil.log(gulpUtil.colors.gray(HR));

  ensureDir(path.join(paths.THEMES));

  try {
    themeVariants.forEach(variant => {
      const filePath = path.join(paths.THEMES, `./${variant.name}.json`);
      const templateData = {commons, variant};
      const templateJSON: any = JSON.parse(mustache.render(themeTemplateFileContent, templateData));
      const templateJSONStringified: string = JSON.stringify(templateJSON, null, 2);

      fs.writeFileSync(filePath, templateJSONStringified, {encoding: CHARSET});

      gulpUtil.log(MESSAGE_GENERATED, gulpUtil.colors.green(filePath));
    });
  } catch (exception) {
    gulpUtil.log(exception);
    cb(exception);
  }

  gulpUtil.log(gulpUtil.colors.gray(HR));
});
