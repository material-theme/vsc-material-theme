import Gulp from 'gulp';
import GulpStats from 'gulp-stats';
import tasks from './.gulp';

// Use gulp-stats
GulpStats(Gulp);

// set default task
Gulp.task('default', tasks);