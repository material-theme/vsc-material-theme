import * as path from 'path';

import PATHS from '../consts/paths'

export default function accentedThemeName(accentName: string): string {
  return path.join(PATHS.THEMES, `./Material-Theme-Icons-${ accentName }.json`);
}