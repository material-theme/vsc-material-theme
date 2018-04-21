import {getAccentableIcons} from '../../helpers/fs';
import * as fs from 'fs';

import { getAbsolutePath, getDefaultValues, getThemeIconsByContributeID, getThemeIconsContribute, getVariantIcons } from "../../helpers/fs";
import { getCurrentThemeIconsID } from "../../helpers/vscode";
import { isAccent, isMaterialThemeIcons, getThemeSettings, getCustomSettings } from "../../helpers/settings";

import { CHARSET } from "../../consts/files";
import { IPackageJSONThemeIcons } from "../../interfaces/ipackage.json";
import {IThemeIconsIconPath, IThemeIcons} from '../../interfaces/itheme-icons';


function getIconDefinition(definitions: any, iconname: string): IThemeIconsIconPath {
  return (definitions as any)[iconname];
}

/**
 * Replaces icon path with the accented one.
 * @param {string} iconPath
 * @param {string} accentName
 * @returns {string}
 */
function replaceIconPathWithAccent(iconPath: string, accentName: string): string {
  return iconPath.replace('.svg', `.accent.${ accentName }.svg`);
}

function getVariantFromColor(color: string): string {
  switch (color) {
    case undefined || 'Material Theme':
      return 'Default';
    case 'Material Theme High Contrast':
      return 'Default High Contrast';
    default:
      return color.replace(/Material Theme /gi, '');
  }
}

export const THEME_ICONS = () => {
  let deferred: any = {};
  let promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  let themeIconsID: string = getCurrentThemeIconsID();

  if (isMaterialThemeIcons(themeIconsID)) {
    let themeSettings = getThemeSettings();
    let customSettings = getCustomSettings();
    let defaults = getDefaultValues();
    let accentName = customSettings.accent;
    let variantName: string = getVariantFromColor(themeSettings.colorTheme);

    let themeContribute: IPackageJSONThemeIcons = getThemeIconsContribute(themeIconsID);
    let theme: IThemeIcons = getThemeIconsByContributeID(themeIconsID);
    let themepath: string = getAbsolutePath(themeContribute.path);

    if (isAccent(accentName, defaults)) {
      let _accentName = accentName.replace(/\s+/, '-');

      getAccentableIcons().forEach(iconname => {
        let distIcon = getIconDefinition(theme.iconDefinitions, iconname);
        let outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

        if (typeof distIcon === 'object' && typeof outIcon === 'object') {
          distIcon.iconPath = replaceIconPathWithAccent(outIcon.iconPath, _accentName)
        }
      })

    } else {

      getAccentableIcons().forEach(iconname => {
        let distIcon = getIconDefinition(theme.iconDefinitions, iconname);
        let outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

        distIcon.iconPath = outIcon.iconPath;
      });
    }

    getVariantIcons().forEach(iconname => {
      let distIcon = getIconDefinition(theme.iconDefinitions, iconname);
      let outIcon = getIconDefinition(defaults.icons.theme.iconDefinitions, iconname);

      if (!!distIcon && !!outIcon) {
        distIcon.iconPath = outIcon.iconPath.replace('.svg', `${ variantName }.svg`);
      }
    })

    fs.writeFile(themepath, JSON.stringify(theme), { encoding: CHARSET }, (error) => {
      if (error) {
        deferred.reject(error);
        return;
      }

      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }

  return promise;
}