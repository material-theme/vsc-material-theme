import * as fs from 'fs';
import * as vscode from 'vscode';

import { getAbsolutePath, getDefaultValues, getThemeIconsByContributeID, getThemeIconsContribute } from "../../helpers/fs";
import { getCurrentThemeID, getCurrentThemeIconsID, reloadWindow } from "../../helpers/vscode";
import { getCustomSettings, isAccent, shouldReloadWindow } from "../../helpers/settings";

import { CHARSET } from "../../consts/files";
import { IPackageJSONThemeIcons } from "../../interfaces/ipackage.json";
import { IThemeIcons } from "../../interfaces/itheme-icons";

export const THEME_CHANGE_LISTENER = () => {
  vscode.workspace.onDidChangeConfiguration(() => {
    let themeID: string = getCurrentThemeID();
    let themeIconsID: string = getCurrentThemeIconsID();

    if (themeIconsID && /material-theme/i.test(themeIconsID)) {
      let customSettings = getCustomSettings();
      let defaults = getDefaultValues();
      let accentName = customSettings.accent;
      let variantNames: string[] = themeID.split('Material Theme');
      let variantName: string = variantNames[1] === undefined ? '' : variantNames[1].trim();
      let themeContribute: IPackageJSONThemeIcons = getThemeIconsContribute(themeIconsID);
      let theme: IThemeIcons = getThemeIconsByContributeID(themeIconsID);
      let themepath: string = getAbsolutePath(themeContribute.path);

      if (isAccent(accentName, defaults)) {
        let _accentName = accentName.replace(/\s+/, '-');
        theme.iconDefinitions._folder_open.iconPath = defaults.icons.theme.iconDefinitions._folder_open.iconPath.replace('.svg', `.accent.${ _accentName }.svg`);
        theme.iconDefinitions._folder_open_build.iconPath = defaults.icons.theme.iconDefinitions._folder_open_build.iconPath.replace('.svg', `.accent.${ _accentName }.svg`);
      } else {
        theme.iconDefinitions._folder_open.iconPath = defaults.icons.theme.iconDefinitions._folder_open.iconPath;
        theme.iconDefinitions._folder_open_build.iconPath = defaults.icons.theme.iconDefinitions._folder_open_build.iconPath;
      }

      theme.iconDefinitions._folder_dark.iconPath = defaults.icons.theme.iconDefinitions._folder_dark.iconPath.replace('.svg', `${ variantName }.svg`);
      theme.iconDefinitions._file_folder.iconPath = defaults.icons.theme.iconDefinitions._file_folder.iconPath.replace('.svg', `${ variantName }.svg`);
      theme.iconDefinitions._folder_dark_build.iconPath = defaults.icons.theme.iconDefinitions._folder_dark_build.iconPath.replace('.svg', `${ variantName }.svg`);
      theme.iconDefinitions["_file_folder-build"].iconPath = defaults.icons.theme.iconDefinitions["_file_folder-build"].iconPath.replace('.svg', `${ variantName }.svg`);

      fs.writeFile(themepath, JSON.stringify(theme), { encoding: CHARSET }, (error) => {
        if (error) {
          console.trace(error);
          return;
        }

        const PROMPT_MESSAGE: string = 'Material Theme requires VS Code reload in order to display icons correctly.';
        const PROMPT_MESSAGE_CONFIRM: string = 'Ok, reload';
        const PROMPT_MESSAGE_CANCEL: string = 'I will do it later';

        if (shouldReloadWindow(themeID, themeIconsID)) {
          vscode.window.showInformationMessage(PROMPT_MESSAGE, PROMPT_MESSAGE_CONFIRM, PROMPT_MESSAGE_CANCEL).then((response) => {
            if (response === PROMPT_MESSAGE_CONFIRM) {
              reloadWindow();
            }
          }, (error) => {
            console.log(error);
          });
        }
      });
    }
  });
}