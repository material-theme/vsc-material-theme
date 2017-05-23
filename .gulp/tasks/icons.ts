/*
 * > Build Icons
 */

import * as Gulp from 'gulp';
import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as gutil from 'gulp-util';
import * as path from 'path';

import { CHARSET } from "../consts/files";
import Paths from '../paths';

export var taskIcons = Gulp.task('build:icons', cb => {
  const partials = fs.readdirSync(path.join(Paths.src, `./icons/partials`));
  const partialData: any = {};
  const files = fs.readdirSync(path.join(Paths.src, `./icons/svgs`));
  const icons = files.map(file => ({ name: file.split('.')[0], last: false }));
  const pathTemp = './themes/.material-theme-icons.tmp';

  icons[icons.length - 1].last = true;

  partials.forEach(partial => {
    partialData[partial.split('.')[0]] = fs.readFileSync(
      path.join(Paths.src, `./icons/partials`, `./${partial}`),
      'utf-8'
    );
  });

  let contents = Mustache.render(
    fs.readFileSync(path.join(Paths.src, `./icons/icons-theme.json`), CHARSET),
    { icons },
    partialData
  );

  try {
    contents = JSON.stringify(JSON.parse(contents), null, 2);
  } catch (err) {
    gutil.log(
      gutil.colors['red']('There is an error with JSON generated for icons'),
      err
    );
    cb(err);
    return;
  }

  fs.writeFileSync(pathTemp, contents, CHARSET);

  gutil.log(
    gutil.colors['gray']('\n———————————————————————————————————————————————————————————————\n')
  );
  gutil.log('Generated', gutil.colors['green'](pathTemp));
  gutil.log(
    gutil.colors['gray']('\n———————————————————————————————————————————————————————————————\n')
  );

  cb();
});
