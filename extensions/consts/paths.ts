import * as path from 'path';

import {IPaths} from '../interfaces/ipaths';

export const PATHS: IPaths = {
  DIST: './dist',
  ICONS: './icons',
  SRC: './src',
  THEMES: './themes',
  VSIX_DIR: path.join(__dirname, '../../'),
};

export default PATHS;
