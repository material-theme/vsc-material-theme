'use strict';

/*
 * > Clean
 */

import gulp from 'gulp';
import paths from '../paths';
import del from 'del';

gulp.task('clean:themes', function() {
  return del(['./*.sublime-theme']);
});

gulp.task('clean:schemes', function() {
  return del([`${paths.schemes}/*.tmTheme`, `${paths.schemes}/*.yml`]);
});

gulp.task('clean:widgets', function() {
  return del([`${paths.widgets}/*.stTheme`, `${paths.widgets}/*.sublime-settings`]);
});

gulp.task('clean:extras', function() {
  return del([`${paths.extras}/**/*.hidden-tmTheme`, `${paths.extras}/**/*.yml`]);
});
