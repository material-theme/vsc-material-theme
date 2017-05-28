import * as vscode from 'vscode';

import { THEMES } from './themes';

export const COMMAND_THEME_SETTER = () => {
  vscode.window.showQuickPick(Object.keys(THEMES)).then(themeSelected => {

    vscode.workspace.getConfiguration().update('workbench.colorTheme', THEMES[themeSelected], true).then(() => {
      if (themeSelected === undefined) return;

      vscode.window.showInformationMessage(`${ themeSelected } theme set.`);
    }, () => {
      if (themeSelected === undefined) return;

      vscode.window.showErrorMessage(`Cannot set theme ${ themeSelected }, please report this bug to the Material theme devs.`);
    });
  });
};