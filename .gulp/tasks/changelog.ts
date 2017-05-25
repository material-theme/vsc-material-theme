/*
 * > Changelog
 */

import * as gulp from 'gulp';
import * as gulpConventionalChangelog from 'gulp-conventional-changelog';

export var task = gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md')
    .pipe(gulpConventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(gulp.dest('./'));
});