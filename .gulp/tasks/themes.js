/*
 * > Build Themes
 */

import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import Mustache from 'mustache';
import YAML from 'yamljs';

import Paths from '../paths';

const themeCommons = require('../../src/themes/settings/commons.json');
const themeVariants = [];
const themeTemplateFile = fs.readFileSync(
  `${Paths.src}/themes/theme-template-color-theme.json`,
  'utf-8'
);

const files = fs.readdirSync(`${Paths.src}/themes/settings/specific`);

// build theme variants for later use in templating
files.forEach(file => {
  const name = file.split('.')[0];
  const filepath = `${Paths.src}/themes/settings/specific/${file}`;
  const contents = fs.readFileSync(filepath, 'utf-8');

  try {
    themeVariants.push(JSON.parse(contents));
  } catch (err) {
    gutil.log('Error when parsing json for theme variants', err);
  }
});

gulp.task('build:themes', cb => {
  gutil.log(
    gutil.colors.magenta('\n--------------'),
    gutil.colors.blue('---------------'),
    gutil.colors.red('---------------'),
    gutil.colors.yellow('---------------'
  ));
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
      'utf-8'
    );

    gutil.log('Generate', gutil.colors.green(path));
  });

  gutil.log(
    'Build completed ✔',
    gutil.colors.magenta('\n--------------'),
    gutil.colors.blue('---------------'),
    gutil.colors.red('---------------'),
    gutil.colors.yellow('---------------'
  ));
});
