'use strict';

/*
 * > Changelog
 */

import gulp from 'gulp';
import paths from '../paths';
import yrgv from 'yargs';
import conventionalChangelog from 'gulp-conventional-changelog';


gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(gulp.dest('./'));
});
