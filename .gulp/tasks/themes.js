import fs from 'fs';
import gulp from 'gulp';
import Mustache from 'mustache';
import YAML from 'yamljs';

const themeCommons = require('../../src/themes/settings/commons.json');
const themeVariants = [];
const themeTemplateFile = fs.readFileSync(
  './src/themes/theme-template.yml',
  'utf-8'
);

const files = fs.readdirSync('./src/themes/settings/specific');

// build theme variants for later use in templating
files.forEach(file => {
  const name = file.split('.')[0];
  const filepath = './src/themes/settings/specific/' + file;
  const contents = fs.readFileSync(filepath, 'utf-8');

  try {
    themeVariants.push(JSON.parse(contents));
  } catch (err) {
    console.log('Error when parsing json for theme variants', err);
  }
});

gulp.task('build:themes', cb => {
  themeVariants.forEach(variant => {
    console.log('Building ', variant.name);
    const templateData = {
      commons: themeCommons,
      variant,
    };

    const templateJson = YAML.parse(
      Mustache.render(themeTemplateFile, templateData)
    );

    fs.writeFileSync(
      `./src/themes/${variant.name}.json`,
      JSON.stringify(templateJson, null, 2),
      'utf-8'
    );
  });
});
