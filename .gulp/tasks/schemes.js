'use strict';

/*
 * > Schemes
 */

import gulp from 'gulp';
import paths from '../paths';
import colors from 'colors';
import path from 'path';
import runSequence from 'run-sequence';
import replace from 'gulp-replace';
import _ from 'lodash';
import common from '~/sources/settings/commons';

var $ = require('gulp-load-plugins')();

gulp.task('build:schemes', ['clean:schemes'], (cb) => {
  runSequence(
    'process:schemes',
    'convert:schemes',
    'escape:schemes',
    (error) => {
      if (error) {
        console.log('[build:schemes]'.bold.magenta + ' There was an issue building schemes:\n'.bold.red + error.message);
      } else {
        console.log('\n[build:schemes]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('process:schemes', function() {
  return gulp.src( `${paths.src}/settings/specific/*.json` )
    .pipe($.flatmap( (stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));

      return gulp.src( `${paths.src}/schemes/scheme.yml` )
        .pipe($.data( () => {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename( (scheme) => {
          scheme.basename = basename;
        }))
        .pipe(gulp.dest('./schemes'));
    }));
});

gulp.task('convert:schemes', function() {
  return gulp.src(`${paths.schemes}/*.yml`)
    .pipe($.plumber( (error) => {
      console.log('\n[convert:schemes]'.bold.magenta + ' There was an issue converting color schemes:\n'.bold.red + error.message +
                  'To fix this error:\nAdd Sublime Text to the `PATH` and then install "PackageDev" via "Package Control.\nOpen Sublime Text before running the task. "'.bold.blue);
      this.emit('end');
    }))
    .pipe($.flatmap( (stream) => {
      return stream
        //.pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file"'))
        .pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file" && subl --command "hide_panel"'))
        .pipe($.exec.reporter());
    }));
});

// Escape CDATA characters
gulp.task('escape:schemes', () => {
  return gulp.src(`${paths.schemes}/*.tmTheme`)
    .pipe(replace('&lt;', '<'))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest(paths.schemes));
});
