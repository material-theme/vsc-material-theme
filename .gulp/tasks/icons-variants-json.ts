import * as fs from 'fs';
import * as gulp from 'gulp';

import {resolve} from 'path';
import {IDefaultsThemeIconVariant} from './../../extensions/interfaces/idefaults';
import {getDefaultValues, getVariantIcons} from './../../extensions/helpers/fs';
import {PATHS} from '../../extensions/consts/paths';
import {CHARSET} from '../../extensions/consts/files';

/**
 * For each ThemeIconVariant create a Material-Theme-Icons-{variant}.json
 * depends on default Material-Theme-Icons.json
 */
export default gulp.task('build:icons.variants-json', callback => {
  try {
    const variants: IDefaultsThemeIconVariant = getDefaultValues().themeIconVariants;
    const defaults = fs.readFileSync(resolve(`${PATHS.THEMES}/Material-Theme-Icons.json`), 'utf8');
    Object.keys(variants).forEach(variantName => {
      const jsonDefaults = JSON.parse(defaults);

      getVariantIcons().forEach(iconname => {
        const newIconPath = jsonDefaults.iconDefinitions[iconname].iconPath.replace('.svg', `${variantName}.svg`);
        jsonDefaults.iconDefinitions[iconname].iconPath = newIconPath;

        fs.writeFileSync(
          `${PATHS.THEMES}/Material-Theme-Icons-${variantName}.json`,
          JSON.stringify(jsonDefaults),
          {encoding: CHARSET}
        );
      });
    });
  } catch (error) {
    return callback(error);
  }

  callback();
});
