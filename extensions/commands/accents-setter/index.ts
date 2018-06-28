import * as vscode from 'vscode';

import {updateAccent} from './../../helpers/settings';
import {getDefaultValues, getAccentsProperties} from './../../helpers/fs';

const REGEXP_HEX: RegExp = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

/**
 * Assigns colours
 */
const assignColorCustomizations = (colour: string, config: any): void => {
  const accentsProperties = getAccentsProperties();
  const newColour = isValidColour(colour) ? colour : undefined;

  Object.keys(accentsProperties).forEach(propertyName => {
    const accent = accentsProperties[propertyName];
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
    return Promise.resolve(null);
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
