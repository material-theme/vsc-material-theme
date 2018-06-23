import * as vscode from 'vscode';

import {IAccentCustomProperty} from './../../interfaces/iaccent-custom-property';
import {IGenericObject} from './../../interfaces/igeneric-object';
import {
  updateAccent,
} from './../../helpers/settings';
import {getDefaultValues} from './../../helpers/fs';

const REGEXP_HEX: RegExp = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

const accentsProperties: IGenericObject <IAccentCustomProperty> = {
  'activityBarBadge.background': {
    alpha: 100,
    value: undefined
  },
  'list.activeSelectionForeground': {
    alpha: 100,
    value: undefined
  },
  'list.inactiveSelectionForeground': {
    alpha: 100,
    value: undefined
  },
  'list.highlightForeground': {
    alpha: 100,
    value: undefined
  },
  'scrollbarSlider.activeBackground': {
    alpha: 50,
    value: undefined
  },
  'editorSuggestWidget.highlightForeground': {
    alpha: 100,
    value: undefined
  },
  'textLink.foreground': {
    alpha: 100,
    value: undefined
  },
  'progressBar.background': {
    alpha: 100,
    value: undefined
  },
  'pickerGroup.foreground': {
    alpha: 100,
    value: undefined
  },
  'tab.activeBorder': {
    alpha: 100,
    value: undefined
  },
  'notificationLink.foreground': {
    alpha: 100,
    value: undefined
  },
  'editor.findWidgetResizeBorder': {
    alpha: 100,
    value: undefined
  },
  'editorWidget.border': {
    alpha: 100,
    value: undefined
  },
  'settings.modifiedItemForeground': {
    alpha: 100,
    value: undefined
  },
  'panelTitle.activeBorder': {
    alpha: 100,
    value: undefined
  }
};

/**
 * Assigns colours
 */
const assignColorCustomizations = (colour: string, config: any): void => {
  const newColour = isValidColour(colour) ? colour : undefined;

  Object.keys(accentsProperties).forEach(propertyName => {
    const accent: IAccentCustomProperty = accentsProperties[propertyName];
    let colorProp = newColour;

    if (colour && accent.alpha < 100) {
      colorProp = `${ colour }${ accent.alpha > 10 ? accent.alpha : `0${ accent.alpha }` }`;
    }

    if (accent) {
      config[propertyName] = colorProp;
    }
  });
};

/**
 * Determines if a string is a valid colour
 */
const isValidColour = (colour: string | null | undefined): boolean =>
  typeof colour === 'string' && REGEXP_HEX.test(colour);

/**
 * Sets workbench options
 */
const setWorkbenchOptions = (accentSelected: string | undefined, config: any): Thenable<string> =>
  vscode.workspace.getConfiguration().update('workbench.colorCustomizations', config, true)
    .then(() => updateAccent(accentSelected),
    reason => vscode.window.showErrorMessage(reason));

/**
 * VSCode command
 */
export default async (): Promise<boolean> => {
  const themeConfigCommon = getDefaultValues();
  const purgeColourKey: string = 'Remove accents';
  const options: string[] = Object.keys(themeConfigCommon.accents).concat(purgeColourKey);

  // shows the quick pick dropdown and wait response
  const accentSelected = await vscode.window.showQuickPick(options);

  if (accentSelected === null || accentSelected === undefined) {
    Promise.resolve(null);
  }

  const config: any = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

  switch (accentSelected) {
    case purgeColourKey:
      assignColorCustomizations(undefined, config);
      await setWorkbenchOptions(undefined, config);
      return Promise.resolve(true);
    default:
      assignColorCustomizations(themeConfigCommon.accents[accentSelected], config);
      await setWorkbenchOptions(accentSelected, config);
      return Promise.resolve(true);
  }

};
