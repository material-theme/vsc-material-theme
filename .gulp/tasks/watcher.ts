import * as gulp from "gulp";
import * as path from "path";

import Paths from "../../extensions/consts/paths";

/*
 * > Watcher
 * Watches files and build the themes
 */
export default gulp.task('watch', () => {
  gulp.watch(path.join(Paths.SRC, `./themes/**/*.json`), ['build:themes']);
});