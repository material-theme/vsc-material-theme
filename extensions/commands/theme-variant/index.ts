import * as fs from "fs";
import * as vscode from 'vscode';

import { getAbsolutePath, getDefaultValues, getPackageJSON } from "../../helpers/fs";
import { getCustomSettings, setCustomSettings } from "../../helpers/settings";

import { CHARSET } from "../../consts/files";
import { THEME_ICONS } from "../theme-icons/index";
import { reloadWindow } from "../../helpers/vscode";

export const THEME_VARIANT = () => {
  let defaults = getDefaultValues();
  let options: string[] = Object.keys(defaults.themeVariants);
  let packageJSON = getPackageJSON();

  options = options.filter(i => i !== packageJSON.contributes.themes[0].path);

  vscode.window.showQuickPick(options).then((response: string) => {
    if (!response) return;

    let customSettings = getCustomSettings();
    let themepath: string = defaults.themeVariants[response];
    let themeUITheme: string = defaults.themeVariantsUITheme[response];

    customSettings.themeColours = response;

    packageJSON.contributes.themes[0].path = themepath;
    packageJSON.contributes.themes[0].uiTheme = themeUITheme;

    fs.writeFile(getAbsolutePath('./package.json'), JSON.stringify(packageJSON, null, 2), { encoding: CHARSET }, (error) => {
      if (error) {
        console.trace(error);
        return;
      }

      setCustomSettings(customSettings);

      THEME_ICONS().then(() => reloadWindow()).catch(error => console.trace(error));
    });
  });
}