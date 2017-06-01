import * as vscode from 'vscode';

import { IGenericObject } from "../interfaces/igeneric-object";
import { IThemeConfigCommons } from "../interfaces/icommons";

let themeConfigCommon: IThemeConfigCommons = require('./commons.json');
let accentsProperties: IGenericObject<string> = {
  "activityBarBadge.background": undefined,
  "list.activeSelectionForeground": undefined,
  "list.inactiveSelectionForeground": undefined,
  "list.highlightForeground": undefined,
  "scrollbarSlider.activeBackground": undefined,
  "editorSuggestWidget.highlightForeground": undefined,
  "textLink.foreground": undefined,
}

/**
 * Assigns colours
 * @param {string} colour
 * @param {*} config
 */
function assignColorCustomizations(colour: string, config: any): void {
  Object.keys(accentsProperties).forEach(propertyName => {
    config[propertyName] = colour;
  });
}

/**
 * Sets workbench options
 * @param {string} accentSelected
 * @param {*} config
 */
function setWorkbenchOptions(accentSelected: string, config: any): void {
  vscode.workspace.getConfiguration().update('workbench.colorCustomizations', config, true).then(() => {
    vscode.window.showInformationMessage(`${ accentSelected } set`);
  }, reason => {
    vscode.window.showErrorMessage(reason);
  });
}

/**
 * VSCode command
 */
export const THEME_ACCENTS_SETTER = () => {
  // shows the quick pick dropdown
  let options: string[] = Object.keys(themeConfigCommon.accents);
  let customColourKey: string = 'Custom colour';
  let purgeColourKey: string = 'Remove accents';

  options.push(customColourKey);
  options.push(purgeColourKey);

  vscode.window.showQuickPick(options).then(accentSelected => {
    if (accentSelected === null || accentSelected === undefined) return;

    let config: any = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

    switch(accentSelected) {
      case customColourKey:
        vscode.window.showInputBox().then(colourCode => {
          if (colourCode === null || colourCode === undefined) return;

          assignColorCustomizations(colourCode, config);
          setWorkbenchOptions(accentSelected, config);
        });
      break;
      case purgeColourKey:
        assignColorCustomizations(undefined, config);
        setWorkbenchOptions(accentSelected, config);
      break;
      default:
        assignColorCustomizations(themeConfigCommon.accents[accentSelected], config);
        setWorkbenchOptions(accentSelected, config);
      break;
    }
  });
}