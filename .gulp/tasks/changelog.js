'use strict';

/*
 * > Changelog
 */

import gulp from 'gulp';
import paths from '../paths';
import yrgv from 'yargs';
import runSequence from 'run-sequence';
import conventionalChangelog from 'gulp-conventional-changelog';


gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 1
    }))
    .pipe(gulp.dest('./'));
});
