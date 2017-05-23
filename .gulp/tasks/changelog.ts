/*
 * > Changelog
 */

import * as Gulp from 'gulp';
import * as conventionalChangelog from 'gulp-conventional-changelog';

export var task = Gulp.task('changelog', () => {
  return Gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(Gulp.dest('./'));
});