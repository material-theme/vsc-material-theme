import * as vscode from 'vscode';

import {IAccentCustomProperty} from '../../interfaces/iaccent-custom-property';
import { IDefaults } from "../../interfaces/idefaults";
import {IGenericObject} from '../../interfaces/igeneric-object';
import { updateAccent } from "../../helpers/settings";

const REGEXP_HEX: RegExp = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

let themeConfigCommon: IDefaults = require('../../defaults.json');
let accentsProperties: IGenericObject<IAccentCustomProperty> = {
  "activityBarBadge.background": {
    alpha: 100,
    value: undefined
  },
  "list.activeSelectionForeground": {
    alpha: 100,
    value: undefined
  },
  "list.inactiveSelectionForeground": {
    alpha: 100,
    value: undefined
  },
  "list.highlightForeground": {
    alpha: 100,
    value: undefined
  },
  "scrollbarSlider.activeBackground": {
    alpha: 50,
    value: undefined
  },
  "editorSuggestWidget.highlightForeground": {
    alpha: 100,
    value: undefined
  },
  "textLink.foreground": {
    alpha: 100,
    value: undefined
  },
  "progressBar.background": {
    alpha: 100,
    value: undefined
  }
}

/**
 * Assigns colours
 * @param {string} colour
 * @param {*} config
 */
function assignColorCustomizations(colour: string, config: any): void {
  if (!isValidColour(colour)) {
    colour = undefined;
  }

  Object.keys(accentsProperties).forEach(propertyName => {
    let accent: IAccentCustomProperty = accentsProperties[propertyName];
    let _colour = colour;

    if (colour && accent.alpha < 100) {
      _colour = `${ colour }${ accent.alpha > 10 ? accent.alpha : `0${ accent.alpha }` }`;
    }

    if (accent) {
      config[propertyName] = _colour;
    }
  });
}

/**
 * Determines if a string is a valid colour
 * @param {(string | null | undefined)} colour
 * @returns {boolean}
 */
function isValidColour(colour: string | null | undefined): boolean {
  if (typeof colour === 'string' && REGEXP_HEX.test(colour)) {
    return true;
  }
  return false;
}

/**
 * Sets workbench options
 * @param {string} accentSelected
 * @param {*} config
 */
function setWorkbenchOptions(accentSelected: string | undefined, config: any): void {
  vscode.workspace.getConfiguration().update('workbench.colorCustomizations', config, true).then(() => {
    // let message: string = accentSelected !== undefined ? `${ accentSelected } set` : `Accents removed`;
    updateAccent(accentSelected);
    // vscode.window.showInformationMessage(message).then(() => {
    // });
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
  // let customColourKey: string = 'Custom colour';
  let purgeColourKey: string = 'Remove accents';

  // options.push(customColourKey);
  options.push(purgeColourKey);

  vscode.window.showQuickPick(options).then(accentSelected => {
    if (accentSelected === null || accentSelected === undefined) return;

    let config: any = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

    switch(accentSelected) {
      // case customColourKey:
      //   vscode.window.showInputBox().then(colourCode => {
      //     if (colourCode === null || colourCode === undefined) return;

      //     if (colourCode && !isValidColour(colourCode)) {
      //       vscode.window.showWarningMessage('Invalid colour set, aborting.');
      //       return;
      //     }

      //     assignColorCustomizations(colourCode, config);
      //     setWorkbenchOptions(accentSelected, config);
      //   });
      // break;
      case purgeColourKey:
        assignColorCustomizations(undefined, config);
        setWorkbenchOptions(undefined, config);
      break;
      default:
        assignColorCustomizations(themeConfigCommon.accents[accentSelected], config);
        setWorkbenchOptions(accentSelected, config);
        // assignIconTheme(accentSelected);
      break;
    }
  });
}