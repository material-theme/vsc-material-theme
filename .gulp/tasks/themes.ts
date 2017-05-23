import * as Gulp from 'gulp';
import * as Mustache from 'mustache';
// import * as YAML from 'yamljs';
/*
 * > Build Themes
 */
import * as fs from 'fs';
import * as gutil from 'gulp-util';

import { CHARSET } from "../consts/files";
import Paths from '../paths';

const themeCommons = require('../../src/themes/settings/commons.json');
const themeVariants: any[] = [];
const themeTemplateFile = fs.readFileSync(
  `${Paths.src}/themes/theme-template-color-theme.json`,
  CHARSET
);

const files = fs.readdirSync(`${Paths.src}/themes/settings/specific`);

// build theme variants for later use in templating
files.forEach(file => {
  // const name: string = file.split('.')[0];
  const filepath = `${Paths.src}/themes/settings/specific/${file}`;
  const contents = fs.readFileSync(filepath, 'utf-8');

  try {
    themeVariants.push(JSON.parse(contents));
  } catch (err) {
    gutil.log('Error when parsing json for theme variants', err);
  }
});

export var taskThemes = Gulp.task('build:themes', () => {
  gutil.log(
    gutil.colors.gray('\n———————————————————————————————————————————————————————————————\n')
  );
  themeVariants.forEach(variant => {
    const templateData = {
      'commons': themeCommons,
      variant
    };

    const templateJson = JSON.parse(
      Mustache.render(themeTemplateFile, templateData)
    );

    const path = `${Paths.themes}/${variant.name}.json`;

    fs.writeFileSync(
      path,
      JSON.stringify(templateJson, null, 2),
      CHARSET
    );

    gutil.log('Generate', gutil.colors['green'](path));
  });

  gutil.log(
    gutil.colors.gray('\n———————————————————————————————————————————————————————————————\n')
  );
});
