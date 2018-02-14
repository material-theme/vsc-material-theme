'use strict';

/*
 * > Bump Version
 */

import gulp from 'gulp';
import paths from '../paths';
import colors from 'colors';
import yrgv from 'yargs';
import runSequence from 'run-sequence';

var $ = require('gulp-load-plugins')();
var argv = yrgv.argv;


gulp.task('bump-env-version', () => {
  return gulp.src(`${paths.utils}/info.py`)
    .pipe($.if((Object.keys(argv).length === 4), $.bump({ key: '__version__' })))
    .pipe($.if(argv.minor, $.bump({ type: 'minor', key: '__version__' })))
    .pipe($.if(argv.major, $.bump({ type: 'major', key: '__version__' })))
    .pipe(gulp.dest(paths.utils));
});


gulp.task('bump-pkg-version', () => {
  return gulp.src(['./package.json', './package-lock.json'])
    .pipe($.if((Object.keys(argv).length === 4), $.bump()))
    .pipe($.if(argv.minor, $.bump({ type: 'minor' })))
    .pipe($.if(argv.major, $.bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});


gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    'bump-env-version',
    (error) => {
      if (error) {
        console.log('\n[bump]'.bold.magenta + ' There was an issue bumping version:\n'.bold.red + error.message);
      } else {
        console.log('\n[bump]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }
      cb(error);
    }
  );
});
