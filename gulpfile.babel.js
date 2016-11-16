/* Sublime Text 3 Theme Builder */

import gulp from 'gulp';
import gulpStats from 'gulp-stats';
import tasks from './.gulp/tasks';

// Use gulp-stats
gulpStats(gulp);

// set default task
gulp.task('default', tasks);
