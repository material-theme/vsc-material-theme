import * as fs from 'fs';

import {
  getAccentableIcons,
  getAbsolutePath,
  getDefaultValues,
  getThemeIconsByContributeID,
  getThemeIconsContribute,
  getIconVariantFromTheme
} from './../../helpers/fs';
import {
  isAccent,
  getCustomSettings,
  isMaterialTheme
} from './../../helpers/settings';
import {getCurrentThemeID, setIconsID, getCurrentThemeIconsID, reloadWindow} from './../../helpers/vscode';
import {CHARSET} from './../../consts/files';
import {IPackageJSONThemeIcons} from './../../interfaces/ipackage.json';
import {IThemeIconsIconPath, IThemeIcons} from './../../interfaces/itheme-icons';

const getIconDefinition = (definitions: any, iconName: string): IThemeIconsIconPath => {
  return (definitions as any)[iconName];
};

/**
 * Replaces icon path with the accented one.
 */
const replaceIconPathWithAccent = (iconPath: string, accentName: string): string => {
  return iconPath.replace('.svg', `.accent.${ accentName }.svg`);
};

/**
 * Fix icons when flag auto-fix is active and current theme is Material
 */
export default async () => {
  const deferred: any = {};
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  // Current theme id set on VSCode ("label" of the package.json)
  const themeLabel = getCurrentThemeID();

  // If this method was called without Material Theme set, just return
  if (!isMaterialTheme(themeLabel)) {
    return deferred.resolve();
  }

  const DEFAULTS = getDefaultValues();
  const CUSTOM_SETTINGS = getCustomSettings();

  const materialIconVariantID: string | null = getIconVariantFromTheme(themeLabel);
  const currentThemeIconsID: string = getCurrentThemeIconsID();
  const newThemeIconsID = materialIconVariantID ?
    `eq-material-theme-icons-${materialIconVariantID}` : 'eq-material-theme-icons';

  // Just set the correct Material Theme icons variant if wasn't
  // Or also change the current icons set to the Material Theme icons variant
  // (this is intended: this command was called directly or `autoFix` flag was already checked by other code)
  if (currentThemeIconsID !== newThemeIconsID) {
    await setIconsID(newThemeIconsID);
  }

  // package.json iconThemes object for the current icons set
  const themeIconsContribute: IPackageJSONThemeIcons = getThemeIconsContribute(newThemeIconsID);
  // Actual json file of the icons theme (eg. Material-Theme-Icons-Darker.json)
  const theme: IThemeIcons = getThemeIconsByContributeID(newThemeIconsID);

  const newIconPath = (outIcon: IThemeIconsIconPath) => isAccent(CUSTOM_SETTINGS.accent, DEFAULTS) ?
    replaceIconPathWithAccent(outIcon.iconPath, CUSTOM_SETTINGS.accent.replace(/\s+/, '-')) : outIcon.iconPath;

  getAccentableIcons().forEach(iconName => {
    const distIcon = getIconDefinition(theme.iconDefinitions, iconName);
    const outIcon = getIconDefinition(DEFAULTS.icons.theme.iconDefinitions, iconName);

    if (typeof distIcon === 'object' && typeof outIcon === 'object') {
      distIcon.iconPath = newIconPath(outIcon);
    }
  });

  // Path of the icons theme .json
  const themePath: string = getAbsolutePath(themeIconsContribute.path);
  fs.writeFile(themePath, JSON.stringify(theme), {
    encoding: CHARSET
  }, async err => {
    if (err) {
      deferred.reject(err);
      return;
    }
    deferred.resolve();
  });

  return promise
    .then(() => reloadWindow())
    .catch((error: NodeJS.ErrnoException) => console.trace(error));
};
