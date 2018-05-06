import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as mustache from 'mustache';
import * as path from 'path';

import {HR, MESSAGE_GENERATED, MESSAGE_ICON_ERROR} from './../consts/log';

import {CHARSET} from './../../extensions/consts/files';
import {IGenericObject} from './../../extensions/interfaces/igeneric-object';
import {IIcon} from './../interfaces/iicon';
import paths from './../../extensions/consts/paths';
import {ensureDir} from './../../extensions/helpers/fs';

/**
 * Returns an object implementing the IIcon interface
 */
const iconFactory = (fileName: string): IIcon => {
  gutil.log(gutil.colors.gray(`Processing icon ${ fileName }`));
  let name: string = path.basename(fileName, path.extname(fileName));
  const filename: string = name;
  const last: boolean = false;

  // renaming icon for vscode
  // if the icon filename starts with a folder prefix,
  // the resulting name will be prefixed only by an underscore,
  // otherwise the icon will be prefixed by a _file_ prefix
  if (name.indexOf('folder')) {
    name = name.indexOf('file') ? `_file_${ name }` : `_${ name }`;
  } else {
    name = `_${ name }`;
  }

  gutil.log(gutil.colors.gray(`VSCode icon name ${ name } with filename ${ filename }`));

  return {filename, name, last} as IIcon;
};

/**
 * > Build Icons
 * @returns {gulp.Gulp}
 */
export default gulp.task('build:icons', cb => {
  let contents: string;
  const fileNames: string[] = fs.readdirSync(path.join(paths.SRC, './icons/svgs'));
  const icons: IIcon[] = fileNames.map(fileName => iconFactory(fileName));
  const partials: string[] = fs.readdirSync(path.join(paths.SRC, './icons/partials'));
  const partialsData: IGenericObject<any> = {};
  const pathTemp: string = './themes/.material-theme-icons.tmp';

  ensureDir(path.join(paths.THEMES));

  icons[icons.length - 1].last = true;

  partials.forEach(partial => {
    partialsData[path.basename(partial, path.extname(partial))] = fs.readFileSync(
      path.join(paths.SRC, './icons/partials', `./${partial}`
    ), CHARSET);
  });

  contents = mustache.render(
    fs.readFileSync(path.join(paths.SRC, './icons/icons-theme.json'), CHARSET),
    {icons},
    partialsData
  );

  try {
    contents = JSON.stringify(JSON.parse(contents), null, 2);
  } catch (error) {
    gutil.log(gutil.colors.red(MESSAGE_ICON_ERROR), error);
    cb(error);
    return;
  }

  fs.writeFileSync(pathTemp, contents, {encoding: CHARSET});

  gutil.log(gutil.colors.gray(HR));
  gutil.log(MESSAGE_GENERATED, gutil.colors.green(pathTemp));
  gutil.log(gutil.colors.gray(HR));

  cb();
});
