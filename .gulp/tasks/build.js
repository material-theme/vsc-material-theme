'use strict';

/*
 * > Build
 */

import gulp from 'gulp';
import colors from 'colors';
import runSequence from 'run-sequence';

gulp.task('build', (cb) => {
  runSequence(
    'build:themes',
    'build:schemes',
    'build:widgets',
    'build:extras',
    (error) => {
      if (error) {
        console.log('\n[build]'.bold.magenta + ' There was an issue building Material Theme:\n'.bold.red + error.message);
      } else {
        console.log('\n[build]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }
      cb(error);
    }
  );
});
