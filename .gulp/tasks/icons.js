'use strict';

/*
 * > Build Icons
 */

import Gulp from 'gulp';
import Colorize from 'gulp-colorize-svgs';
import Paths from '../paths';

Gulp.task('process:icons', () => {
  Gulp.src(`${Paths.src}/icons/*.svg`)
    .pipe(Colorize({
      colors: {
        // All files
        default: {
          green: '90A959',
          blue: '6A9FB5',
          blueDesaturated: '78909C',
          red: 'AC4142',
          redLight: 'D14748',
          maroon: 'AB7558',
          limeGreen: 'B8E15E',
          greenTea: '2ECC71',
          purple: 'AA759F',
          purpleDark: '8251A8',
          yellow: 'F4BF75',
          teal: '80CBC4',
          orange: 'D28445',
        },
        // Specific files
        icon2: {
          green: '00ff00'
        }
      },
      replaceColor: function (content, hex) {
        return content.replace('#000', '#' + hex);
      }
    }))
    .pipe(Gulp.dest(Paths.icons));
});