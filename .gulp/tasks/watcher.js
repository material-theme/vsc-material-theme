'use strict';

/*
 * > Watcher
 */

import Gulp from 'gulp';
import Paths from '../paths';

Gulp.task('watch', () => {
  Gulp.watch(`${Paths.src}/themes/**/*.json`, ['build:themes']);
});