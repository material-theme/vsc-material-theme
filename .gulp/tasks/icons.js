'use strict';

/*
 * > Build Icons
 */

import Gulp from 'gulp';
import Colorize from 'gulp-colorize-svgs';
import colors from 'colors';
import Paths from '../paths';
import del from 'del';

import iconsColors from '../../icons/colors.js';

console.log(iconsColors);

Gulp.task('process:icons', () => {
  del([`${Paths.icons}/svg/*.svg`]).then(paths => {
    console.log('[ 🔥 Deleting all icons]\n'.bold.red);
  });
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