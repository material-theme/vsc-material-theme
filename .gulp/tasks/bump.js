'use strict';

/*
 * > Bump
 */

import gulp from 'gulp';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import yrgv from 'yargs';
import bump from 'gulp-bump';
import gulpif from 'gulp-if';

var argv = yrgv.argv;

gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    (error) => {
      if (error) {
        console.log(gutil.colors.magenta.bold('[bump]'), gutil.colors.red.bold(' There was an issue bumping version:\n'), error.message);
      } else {
        console.log(gutil.colors.magenta.bold('[bump]'), gutil.colors.green.bold(' Finished successfully'));
      }
      cb(error);
    }
  );
});

gulp.task('bump-pkg-version', () => {
  return gulp.src(['./package.json'])
    .pipe(gulpif((Object.keys(argv).length === 2), bump()))
    .pipe(gulpif(argv.patch, bump()))
    .pipe(gulpif(argv.minor, bump({ type: 'minor' })))
    .pipe(gulpif(argv.major, bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});