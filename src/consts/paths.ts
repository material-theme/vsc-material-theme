import * as path from 'path';

import {IPaths} from '../interfaces/ipaths';

export const PATHS: IPaths = {
  SRC: './src',
  THEMES: './out/themes',
  UI: './out/ui',
  VSIX_SRC_DIR: path.join(__dirname, '../..'), // From "src" dir
  VSIX_DIR: path.join(__dirname, '../../..'), // From "out" dir
  EXT_DIR: path.join(__dirname, '..')
};

export default PATHS;
