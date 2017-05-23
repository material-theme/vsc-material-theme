/*
 * > Bump
 */

import * as Gulp from 'gulp';
import * as Gulpif from 'gulp-if';
import * as bump from 'gulp-bump';
import * as gutil from 'gulp-util';
import * as runSequence from 'run-sequence';
import * as yrgv from 'yargs';

var argv = (yrgv as any).argv;

export var taskBump = Gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    (error) => {
      if (error) {
        console.log(gutil.colors.magenta.bold('[bump]'), gutil.colors.red.bold(' There was an issue bumping version:\n'), error);
      } else {
        console.log(gutil.colors.magenta.bold('\n[bump]'), gutil.colors.green.bold(' Finished successfully\n'));
      }
      cb(error);
    }
  );
});

export var taskVersioning = Gulp.task('bump-pkg-version', () => {
  return Gulp.src(['./package.json'])
    .pipe(Gulpif((Object.keys(argv).length === 2), bump()))
    .pipe(Gulpif(argv.patch, bump()))
    .pipe(Gulpif(argv.minor, bump({ type: 'minor' })))
    .pipe(Gulpif(argv.major, bump({ type: 'major' })))
    .pipe(Gulp.dest('./'));
});