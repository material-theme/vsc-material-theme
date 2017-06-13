import * as vscode from 'vscode';

import { IGenericObject } from "./interfaces/igeneric-object";
import { THEME_ACCENTS_SETTER } from "./accents-setter/index";

enum Commands {
  ACCENTS,
  COLOR_THEME
}

const OPTIONS: IGenericObject<number> = {
  'Change accent color': Commands.ACCENTS
}

export function activate(context: vscode.ExtensionContext) {
  // registering the command
  let command = vscode.commands.registerCommand('material.theme.config', () => {
    // the user is going to choose what aspect of theme to config
    vscode.window.showQuickPick(Object.keys(OPTIONS)).then(response => {
      // switching selected option
      switch(OPTIONS[response]) {
        case Commands.ACCENTS:
          THEME_ACCENTS_SETTER();
        break;
      }
    });
  });
  context.subscriptions.push(command);
}
