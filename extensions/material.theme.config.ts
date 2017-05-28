import * as vscode from 'vscode';

import { COMMAND_THEME_SETTER } from "./theme-setter/index";
import { IGenericObject } from "./interfaces/igeneric-object";

enum Commands {
  ACCENTS,
  COLOR_THEME
}

const OPTIONS: IGenericObject<number> = {
  'Change accents': Commands.ACCENTS,
  'Change color scheme': Commands.COLOR_THEME
}

export function activate(context: vscode.ExtensionContext) {
  // registering the command
  let command = vscode.commands.registerCommand('material.theme.config', () => {
    // the user is going to choose what aspect of theme to config
    vscode.window.showQuickPick(Object.keys(OPTIONS)).then(response => {
      // switching selected option
      switch(OPTIONS[response]) {
        // case Commands.ACCENTS:

        // break;
        case Commands.COLOR_THEME:
          COMMAND_THEME_SETTER();
        break;
      }
    });
  });
  context.subscriptions.push(command);
}
