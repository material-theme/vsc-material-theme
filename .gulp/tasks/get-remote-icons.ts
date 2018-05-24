import * as path from 'path';
import * as gulp from 'gulp';
import * as execa from 'execa';
import * as rimraf from 'rimraf';
import {ncp} from 'ncp';

const pCopy = (src: string, dest: string) => new Promise((resolve, reject) =>
  ncp(src, dest, err => err ? reject(err) : resolve())
);

const pRm = (dir: string) => new Promise((resolve, reject) =>
  rimraf(dir, (err: any) => err ? reject(err) : resolve())
);

/**
 * Get remote Material Icons
 */
export default gulp.task('build:get-remote-icons', callback => {
  const src = 'ssh://equinsuocha@vs-ssh.visualstudio.com:22/vsc-material-theme-icons/_ssh/vsc-material-theme-icons';
  const tmpDest = './_tmp-output-remote-icons';
  const dest = './src/icons/svgs';

  execa('git', [
    'clone',
    '--depth=1',
    src,
    tmpDest
  ])
  .then(() => pCopy(path.join(tmpDest, dest), dest))
  .then(() => pRm(tmpDest))
  .then(() => callback())
  .catch((err: any) => callback(err.message));
});
