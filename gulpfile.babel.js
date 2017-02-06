import gulp from 'gulp';
import gulpStats from 'gulp-stats';
import tasks from './.gulp';

// Use gulp-stats
gulpStats(gulp);

// set default task
gulp.task('default', tasks);