'use strict';

/*
 * > Bump
 */

import gulp from 'gulp';
import runSequence from 'run-sequence';
import colors from 'colors';
import yrgv from 'yargs';
import bump from 'gulp-bump';
import gulpif from 'gulp-if';

var argv = yrgv.argv;

gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    (error) => {
      if (error) {
        console.log('[bump]'.bold.magenta + ' There was an issue bumping version:\n'.bold.red + error.message);
      } else {
        console.log('[bump]'.bold.magenta + ' Finished successfully'.bold.green);
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