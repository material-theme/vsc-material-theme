'use strict';

/*
 * > Build Icons
 */

import Gulp from 'gulp';
import Colorize from 'gulp-colorize-svgs';
import runSequence from 'run-sequence';
import Template from 'gulp-template';
import Rename from 'gulp-rename';
import FileList from 'gulp-filelist';
import Data from 'gulp-data';
import Paths from '../paths';
import Del from 'del';

import iconsColors from '../../src/settings/colors.js';
import iconList from '../../src/iconlist.json';


Gulp.task('icons', (cb) => {
  runSequence(
    'clean:icons',
    'process:icons',
    'iconslist',
    'template:icons',
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


Gulp.task('clean:icons', () => {
  Del([`${Paths.icons}/svg/*.svg`]);
});

Gulp.task('process:icons', () => {
  Gulp.src(`${Paths.src}/icons/*.svg`)
    .pipe(Colorize({
      colors: iconsColors,
      replaceColor: function (content, hex) {
        return content.replace('#000', '#' + hex);
      },
      replacePath: function (path, colorKey) {
        return path.replace(/\.svg/, '.svg');
      }
    }))
    .pipe(Gulp.dest(`${Paths.icons}/svg`));
});

Gulp.task('iconslist', () => {
  Gulp.src(`${Paths.src}/icons/*.svg`)
    .pipe(FileList('iconlist.json', {
      flatten: true,
      removeExtensions: true
    }))
    .pipe(Gulp.dest(Paths.src));
});


Gulp.task('template:icons', () => {
  Gulp.src(`${Paths.src}/theme-icon.template`)
    .pipe(Data(() => ({ icons: iconList })))
    .pipe(Template())
    .pipe(Rename({
      basename: "material-theme-icon-theme",
      extname: ".json"
    }))
    .pipe(Gulp.dest(Paths.icons));
});