import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as mustache from 'mustache';
import * as path from 'path';

import { HR, MESSAGE_GENERATED, MESSAGE_ICON_ERROR } from './../consts/log';

import { CHARSET } from "../../extensions/consts/files";
import { IGenericObject } from "../../extensions/interfaces/igeneric-object";
import { IIcon } from './../interfaces/iicon';
import paths from '../../extensions/consts/paths';

/**
 * Returns an object implementing the IIcon interface
 * @param {string} fileName
 * @returns {IIcon}
 */
function iconFactory(fileName: string): IIcon {
  let name: string = path.basename(fileName, path.extname(fileName));
  let last: boolean = false;

  return { name, last } as IIcon;
}

/**
 * > Build Icons
 * @returns {gulp.Gulp}
 */
export default gulp.task('build:icons', cb => {
  let contents: string;
  let fileNames: string[] = fs.readdirSync(path.join(paths.SRC, `./icons/svgs`));
  let icons: IIcon[] = fileNames.map(fileName => iconFactory(fileName));
  let partials: string[] = fs.readdirSync(path.join(paths.SRC, `./icons/partials`));
  let partialsData: IGenericObject<any> = {};
  let pathTemp: string = './themes/.material-theme-icons.tmp';

  icons[icons.length - 1].last = true;

  partials.forEach(partial => {
    partialsData[path.basename(partial, path.extname(partial))] = fs.readFileSync(path.join(paths.SRC, `./icons/partials`, `./${partial}`), CHARSET);
  });

  contents = mustache.render(
    fs.readFileSync(path.join(paths.SRC, `./icons/icons-theme.json`), CHARSET)
  , { icons }
  , partialsData
  );

  try {
    contents = JSON.stringify(JSON.parse(contents), null, 2);
  } catch (error) {
    gutil.log(gutil.colors.red(MESSAGE_ICON_ERROR), error);
    cb(error);
    return;
  }

  fs.writeFileSync(pathTemp, contents, { encoding: CHARSET });

  gutil.log(gutil.colors.gray(HR));
  gutil.log(MESSAGE_GENERATED, gutil.colors.green(pathTemp));
  gutil.log(gutil.colors.gray(HR));

  cb();
});
