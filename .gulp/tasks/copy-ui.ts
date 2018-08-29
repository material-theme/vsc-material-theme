import * as fs from 'fs';
import * as path from 'path';
import * as gulp from 'gulp';

import {PATHS} from '../../extensions/consts/paths';
import {ensureDir} from '../../extensions/helpers/fs';

/**
 * For each ThemeIconVariant create a Material-Theme-Icons-{variant}.json
 * depends on default Material-Theme-Icons.json
 */
export default gulp.task('build:copy-ui', callback => {
  try {
      ensureDir(path.resolve(PATHS.UI));
      fs.copyFileSync(
        path.join(PATHS.SRC, 'webviews', 'ui', 'release-notes', 'release-notes.html'),
        path.join(PATHS.UI, 'release-notes.html')
      );
      fs.copyFileSync(
        path.join(PATHS.SRC, 'webviews', 'ui', 'release-notes', 'style.css'),
        path.join(PATHS.UI, 'release-notes.css')
      );
  } catch (error) {
    return callback(error);
  }

  callback();
});
