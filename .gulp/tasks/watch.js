'use strict';

/*
 * > Watch
 */

import gulp from 'gulp';
import paths from '../paths';


gulp.task('watch', ['build'], () => {
  gulp.watch(`${paths.src}/themes/**/*.json`, ['build:themes']);
  gulp.watch(`${paths.src}/schemes/scheme.yml`, ['build:schemes']);
  gulp.watch(`${paths.src}/extras/**/*.yml`, ['build:extras']);
  gulp.watch(`${paths.src}/widgets/widget.*`, ['build:widgets']);
  gulp.watch(`${paths.src}/settings/**/*.json`, ['build:schemes', 'build:widgets', 'build:themes']);
  gulp.watch("gulpfile.babel.js").on("change", () => process.exit(0));
});
