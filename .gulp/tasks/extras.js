'use strict';

/*
 * > Extras
 */

import gulp from 'gulp';
import paths from '../paths';
import colors from 'colors';
import runSequence from 'run-sequence';
import path from 'path';
import _ from 'lodash';
import common from '~/sources/settings/commons';

var $ = require('gulp-load-plugins')();

gulp.task('process:extras', () => {
  return gulp.src(`${paths.src}/settings/specific/*.json`)
    .pipe($.flatmap( (stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));

      return gulp.src(`${paths.src}/extras/**/*.yml`)
        .pipe($.data( () => {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename( (scheme) => {
          scheme.basename = basename;
        }))
        .pipe(gulp.dest(paths.extras));
    }));
});

gulp.task('convert:extras', () => {
  return gulp.src(`${paths.extras}/**/*.yml`)
    .pipe($.flatmap( (stream) => {
      return stream
        .pipe($.plumber( (error) => {
          console.log('[convert:extras]'.bold.magenta + ' There was an issue converting color extras:\n'.bold.red + error.message +
                      'To fix this error:\nAdd Sublime Text to the `PATH` and then install "PackageDev" via "Package Control".\nOpen Sublime Text before running the task.'.bold.blue);
          this.emit('end');
        }))
        .pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file"'))
        .pipe($.exec.reporter());
    }));
});


gulp.task('build:extras', ['clean:extras'], (cb) => {
  runSequence(
    'process:extras',
    'convert:extras',
    (error) => {
      if (error) {
        console.log('\n[build:extras]'.bold.magenta + ' There was an issue building extras:\n'.bold.red + error.message);
      } else {
        console.log('\n[build:extras]'.bold.magenta + ' Finished successfully\n'.bold.green);
      }

      cb(error);
    }
  );
});
