'use strict';

/*
 * > Bump
 */

import Gulp from 'gulp';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import yrgv from 'yargs';
import bump from 'gulp-bump';
import Gulpif from 'gulp-if';

var argv = yrgv.argv;

Gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    (error) => {
      if (error) {
        console.log(gutil.colors.magenta.bold('[bump]'), gutil.colors.red.bold(' There was an issue bumping version:\n'), error.message);
      } else {
        console.log(gutil.colors.magenta.bold('\n[bump]'), gutil.colors.green.bold(' Finished successfully\n'));
      }
      cb(error);
    }
  );
});

Gulp.task('bump-pkg-version', () => {
  return Gulp.src(['./package.json'])
    .pipe(gulpif((Object.keys(argv).length === 2), bump()))
    .pipe(gulpif(argv.patch, bump()))
    .pipe(gulpif(argv.minor, bump({ type: 'minor' })))
    .pipe(gulpif(argv.major, bump({ type: 'major' })))
    .pipe(Gulp.dest('./'));
});