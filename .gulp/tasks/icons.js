/*
 * > Build Icons
 */

import fs from 'fs';
import gulp from 'gulp';
import Mustache from 'mustache';
import gutil from 'gulp-util';
import Paths from '../paths';

gulp.task('build:icons', cb => {
  const partials = fs.readdirSync(`${Paths.src}/icons/partials`);
  const partialData = {};
  const files = fs.readdirSync(`${Paths.src}/icons/svgs`);
  const icons = files.map(file => ({ name: file.split('.')[0], last: false }));
  icons[icons.length - 1].last = true;

  partials.forEach(partial => {
    partialData[partial.split('.')[0]] = fs.readFileSync(
      `${Paths.src}/icons/partials/${partial}`,
      'utf-8'
    );
  });

  let contents = Mustache.render(
    fs.readFileSync(`${Paths.src}/icons/icons-theme.json`, 'utf-8'),
    { icons },
    partialData
  );

  try {
    contents = JSON.stringify(JSON.parse(contents), null, 2);
  } catch (err) {
    gutil.log(
      gutil.colors.red('There is an error with JSON generated for icons'),
      err
    );
    cb(err);
    return;
  }

  const path = './.material-theme-icons.tmp';
  fs.writeFileSync(path, contents, 'utf-8');
  gutil.log('Generated', gutil.colors.green(path));

  cb();
});
