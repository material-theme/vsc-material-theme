import * as vscode from 'vscode';

import { IGenericObject } from "./interfaces/igeneric-object";
import { THEME_ACCENTS_SETTER } from "./commands/accents-setter/index";
import { THEME_VARIANT } from "./commands/theme-variant/index";
import { shouldShowChangelog, showChangelog } from './helpers/changelog';

enum Commands {
  ACCENTS,
  CHANGELOG,
  COLOUR_VARIANT
}

const OPTIONS: IGenericObject<number> = {
  'Change accent color': Commands.ACCENTS,
  'Change color variant': Commands.COLOUR_VARIANT,
  'Show changelog': Commands.CHANGELOG
}

export function activate(context: vscode.ExtensionContext) {
  if (vscode.workspace.getConfiguration().has('materialTheme.cache.workbench.accent')) {
    vscode.workspace.getConfiguration().update('materialTheme.cache.workbench.accent', undefined, true);
  }

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
        case Commands.COLOUR_VARIANT:
          THEME_VARIANT();
        break;
      }
    });
  });

  context.subscriptions.push(command);
}
