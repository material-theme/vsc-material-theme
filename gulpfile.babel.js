/* Sublime Text 3 Theme Builder */

import gulp from 'gulp';

// Use gulp-stats
//require('gulp-stats')(gulp);
require('require-dir')('.gulp/tasks');

// Set default script
gulp.task('default', ['build']);

// protip: stop old version of gulp watch from running when you modify the gulpfile
gulp.watch("gulpfile.babel.js").on("change", () => process.exit(0));
