'use strict';

/*
 * > Build Icons
 */

import Gulp from 'gulp';
import runSequence from 'run-sequence';
import Template from 'gulp-template';
import Rename from 'gulp-rename';
import FileList from 'gulp-filelist';
import Include from 'gulp-include';
import Data from 'gulp-data';
import Paths from '../paths';

import iconList from '../../iconlist.json';


Gulp.task('build:icons', (cb) => {
  runSequence(
    'build:iconslist',
    'build:templateicons',
    (error) => {
      if (error) {
        console.log('\n[Build Icons]'.bold.magenta + ' There was an issue building icons:\n'.bold.red + error.message);
      } else {
        console.log('\n[Build Icons]'.bold.magenta + ' Finished successfully\n'.bold.green);
      }
      cb(error);
    }
  );
});


Gulp.task('build:iconslist', () => {
  Gulp.src(`${Paths.src}/icons/svgs/*.svg`)
    .pipe(FileList('iconlist.json', {
      flatten: true,
      removeExtensions: true
    }))
    .pipe(Gulp.dest('./'));
});


Gulp.task('build:templateicons', () => {
  Gulp.src(`${Paths.src}/icons/icons-theme.json`)
    .pipe(Include())
      .on('error', console.log)
    .pipe(Data(() => ({ icons: iconList })))
    .pipe(Template())
    .pipe(Rename({
      basename: ".material-theme-icons",
      extname: ".tmp"
    }))
    .pipe(Gulp.dest('./'));
});