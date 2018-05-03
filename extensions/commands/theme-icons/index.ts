import * as fs from 'fs';

import {
  getAccentableIcons,
  getAbsolutePath,
  getDefaultValues,
  getThemeIconsByContributeID,
  getThemeIconsContribute,
  getVariantIcons
} from './../../helpers/fs';
import {
  isAccent,
  isMaterialThemeIcons,
  getCustomSettings
} from './../../helpers/settings';
import {getCurrentThemeIconsID, getCurrentThemeID} from './../../helpers/vscode';
import {CHARSET} from './../../consts/files';
import {IPackageJSONThemeIcons} from './../../interfaces/ipackage.json';
import {IThemeIconsIconPath, IThemeIcons} from './../../interfaces/itheme-icons';

const getIconDefinition = (definitions: any, iconname: string): IThemeIconsIconPath => {
  return (definitions as any)[iconname];
};

/**
 * Replaces icon path with the accented one.
 */
const replaceIconPathWithAccent = (iconPath: string, accentName: string): string => {
  return iconPath.replace('.svg', `.accent.${ accentName }.svg`);
};

const getVariantFromColor = (color: string): string => {
  switch (color) {
    case undefined || 'Material Theme':
      return 'Default';
    case 'Material Theme High Contrast':
      return 'Default High Contrast';
    default:
      return color.replace(/Material Theme /gi, '');
  }
};

export const THEME_ICONS = () => {
  const deferred: any = {};
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  const themeIconsID: string = getCurrentThemeIconsID();

  if (isMaterialThemeIcons(themeIconsID)) {
    const themeID = getCurrentThemeID();
    const customSettings = getCustomSettings();
    const defaults = getDefaultValues();
    const accentName = customSettings.accent;
    const variantName: string = getVariantFromColor(themeID);

    const themeContribute: IPackageJSONThemeIcons = getThemeIconsContribute(themeIconsID);
    const theme: IThemeIcons = getThemeIconsByContributeID(themeIconsID);
    const themepath: string = getAbsolutePath(themeContribute.path);

    if (isAccent(accentName, defaults)) {
      const realAccentName = accentName.replace(/\s+/, '-');
      getAccentableIcons().forEach(iconname => {
        const distIcon = getIconDefinition(theme.iconDefinitions, iconname);
        const outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

        if (typeof distIcon === 'object' && typeof outIcon === 'object') {
          distIcon.iconPath = replaceIconPathWithAccent(outIcon.iconPath, realAccentName);
        }
      });

    } else {
      getAccentableIcons().forEach(iconname => {
        const distIcon = getIconDefinition(theme.iconDefinitions, iconname);
        const outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

        distIcon.iconPath = outIcon.iconPath;
      });
    }

    getVariantIcons().forEach(iconname => {
      const distIcon = getIconDefinition(theme.iconDefinitions, iconname);
      const outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

      if (distIcon && outIcon) {
        distIcon.iconPath = outIcon.iconPath.replace('.svg', `${ variantName }.svg`);
      }
    });

    fs.writeFile(themepath, JSON.stringify(theme), {
      encoding: CHARSET
    }, err => {
      if (err) {
        deferred.reject(err);
        return;
      }

      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }

  return promise;
};
