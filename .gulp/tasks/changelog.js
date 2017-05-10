'use strict';

/*
 * > Changelog
 */

import Gulp from 'gulp';
import conventionalChangelog from 'gulp-conventional-changelog';


Gulp.task('changelog', () => {
  return Gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(Gulp.dest('./'));
});