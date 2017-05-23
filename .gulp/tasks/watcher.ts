/*
 * > Watcher
 */

import * as Gulp from 'gulp';

import Paths from '../paths';

export var taskWatch = Gulp.task('watch', () => {
  Gulp.watch(`${Paths.src}/themes/**/*.json`, ['build:themes']);
});