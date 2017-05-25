import * as bump from 'gulp-bump';
import * as gulp from 'gulp';
import * as gulpIf from 'gulp-if';
import * as gulpUtil from 'gulp-util';
import * as runSequence from 'run-sequence';
import * as yargs from 'yargs';

import { MESSAGE_BUMP_ERROR, MESSAGE_BUMP_SUCCESS } from "../consts/log";

var argv = yargs.argv;

export var taskBump = gulp.task('bump', (cb) => {
  runSequence(
    'bump-pkg-version',
    error => {
      if (error) {
        console.log(gulpUtil.colors.magenta.bold('[bump]'), gulpUtil.colors.red.bold(MESSAGE_BUMP_ERROR), error);
      } else {
        console.log(gulpUtil.colors.magenta.bold('\n[bump]'), gulpUtil.colors.green.bold(MESSAGE_BUMP_SUCCESS));
      }
      cb(error);
    }
  );
});

export var taskVersioning = gulp.task('bump-pkg-version', () => {
  return gulp.src(['./package.json'])
    .pipe(gulpIf((Object.keys(argv).length === 2), bump()))
    .pipe(gulpIf(argv.patch, bump()))
    .pipe(gulpIf(argv.minor, bump({ type: 'minor' })))
    .pipe(gulpIf(argv.major, bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});

export default { taskBump, taskVersioning };