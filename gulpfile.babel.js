/* Sublime Text 3 Theme Builder */

import gulp from 'gulp';

// Use gulp-stats
require('gulp-stats')(gulp);
require('require-dir')('.gulp/tasks');

// Set default script
gulp.task('default', ['build']);
