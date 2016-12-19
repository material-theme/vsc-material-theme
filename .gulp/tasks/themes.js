'use strict';

/*
 * > Themes
 */

import gulp from 'gulp';
import paths from '../paths';
import colors from 'colors';
import path from 'path';
import _ from 'lodash';
import common from '~/sources/settings/commons';

var $ = require('gulp-load-plugins')();

gulp.task('build:themes', ['clean:themes'], () => {
  return gulp.src(`${paths.src}/themes/*.json`)
    .pipe($.plumber( (error) => {
      console.log('\n[build:themes]'.bold.magenta + ' There was an issue building themes:\n'.bold.red + error.message);
      this.emit('end');
    }))
    .pipe($.include())
    .pipe($.data( (file) => {
      var specific = require('~/sources/settings/specific/' + path.basename(file.path));
      return _.merge(common, specific);
    }))
    .pipe($.template())
    .pipe($.rename( (path) => {
      path.basename = path.basename;
      path.extname = '.sublime-theme';
    }))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      console.log('\n[build:themes]'.bold.magenta + ' Finished successfully \n'.bold.green);
    });
});
