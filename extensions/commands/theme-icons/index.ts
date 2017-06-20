import * as fs from 'fs';
import * as vscode from 'vscode';

import { getAbsolutePath, getDefaultValues, getThemeIconsByContributeID, getThemeIconsContribute } from "../../helpers/fs";
import { getCurrentThemeID, getCurrentThemeIconsID, reloadWindow } from "../../helpers/vscode";
import { shouldReloadWindow, updateSettingsTheme, updateSettingsThemeIcons } from "../../helpers/settings";

import { CHARSET } from "../../consts/files";
import { IPackageJSONThemeIcons } from "../../interfaces/ipackage.json";
import { IThemeIcons } from "../../interfaces/itheme-icons";
import { assignIconTheme } from "../accents-setter/index";

export const THEME_CHANGE_LISTENER = () => {
  vscode.workspace.onDidChangeConfiguration(() => {
    let cacheKey: string = 'materialTheme.cache.workbench.accent';
    let cache = vscode.workspace.getConfiguration().get<any>(cacheKey);
    let themeID: string = getCurrentThemeID();
    let themeIconsID: string = getCurrentThemeIconsID();

    if (themeIconsID && /material-theme/i.test(themeIconsID)) {
      let defaults = getDefaultValues();
      let variantNames: string[] = themeID.split('Material Theme');
      let variantName: string = variantNames[1] === undefined ? '' : variantNames[1].trim();
      let themeContribute: IPackageJSONThemeIcons = getThemeIconsContribute(themeIconsID);
      let theme: IThemeIcons = getThemeIconsByContributeID(themeIconsID);
      let themepath: string = getAbsolutePath(themeContribute.path);
      let shouldReload: boolean = shouldReloadWindow(themeID, themeIconsID);

      theme.iconDefinitions._folder_dark.iconPath = defaults.icons.theme.iconDefinitions._folder_dark.iconPath.replace('.svg', `${ variantName }.svg`);
      theme.iconDefinitions._file_folder.iconPath = defaults.icons.theme.iconDefinitions._file_folder.iconPath.replace('.svg', `${ variantName }.svg`);
      theme.iconDefinitions["_file_folder-build"].iconPath = defaults.icons.theme.iconDefinitions["_file_folder-build"].iconPath.replace('.svg', `${ variantName }.svg`);

      if (!!cache && cache.globalValue) {
        assignIconTheme(cacheKey);
      }

      updateSettingsTheme(themeID);
      updateSettingsThemeIcons(themeIconsID);

      console.log(
        theme.iconDefinitions._folder_dark.iconPath
      , theme.iconDefinitions._file_folder.iconPath
      )

      fs.writeFileSync(themepath, JSON.stringify(theme), CHARSET);

      vscode.workspace.getConfiguration().update('workbench.iconTheme', themeIconsID, true).then(() => {
        if (shouldReload) {
          reloadWindow();
        }
      });
    }
  });
}