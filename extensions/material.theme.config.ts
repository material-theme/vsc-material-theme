import * as vscode from 'vscode';

import { IGenericObject } from "./interfaces/igeneric-object";
import { THEME_ACCENTS_SETTER } from "./commands/accents-setter/index";
import { THEME_ICONS } from "./commands/theme-icons/index";
import { shouldShowChangelog, showChangelog } from './helpers/changelog';
import { reloadWindow, getCurrentThemeID, setIconsID } from "./helpers/vscode";

enum Commands {
  ACCENTS,
  CHANGELOG,
  THEME_ICONS
}

const OPTIONS: IGenericObject<number> = {
  '🎨 Change accent color': Commands.ACCENTS,
  '🛠 Fix file icons': Commands.THEME_ICONS,
  '🚧 Show changelog': Commands.CHANGELOG
}

const isMaterialTheme = (currentTheme: string): boolean =>
  currentTheme.includes('Material Theme');

export function activate(context: vscode.ExtensionContext) {
  if (vscode.workspace.getConfiguration().has('materialTheme.cache.workbench.accent')) {
    vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.accent', undefined, true);
  }

  vscode.workspace.onDidChangeConfiguration(async event => {
    const isColorTheme = event.affectsConfiguration('workbench.colorTheme');
    const currentTheme = getCurrentThemeID();
    if (isColorTheme && isMaterialTheme(currentTheme)) {
      await setIconsID('eq-material-theme-icons');
      await THEME_ICONS().catch(error => console.trace(error));
      reloadWindow();
    }
  });

  if (shouldShowChangelog()) {
    showChangelog();
  }

  // registering the command
  let command = vscode.commands.registerCommand('material.theme.config', () => {
    // the user is going to choose what aspect of theme to config
    vscode.window.showQuickPick(Object.keys(OPTIONS)).then(response => {
      // switching selected option
      switch(OPTIONS[response]) {
        case Commands.ACCENTS:
          THEME_ACCENTS_SETTER();
        break;
        case Commands.CHANGELOG:
          showChangelog();
        break;
        case Commands.THEME_ICONS:
          THEME_ICONS().then(() => reloadWindow()).catch(error => console.trace(error))
        break;
      }
    });
  });

  context.subscriptions.push(command);
}
