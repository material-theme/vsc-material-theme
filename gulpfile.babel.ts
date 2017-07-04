import * as Gulp from 'gulp';
import * as GulpStats from 'gulp-stats';
import * as tasks from './.gulp';

// Use gulp-stats
GulpStats(Gulp);

// set default task
Gulp.task('default', tasks.default as any);