import * as vscode from 'vscode';

import {getDefaultValues, getAccentsProperties} from './../../helpers/fs';
import consts from './consts';

const REGEXP_HEX: RegExp = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

/**
 * Assigns colours
 */
const assignColorCustomizations = (colour: string): Object => {
  const accentsProperties = getAccentsProperties();
  const newColour = isValidColour(colour) ? colour : undefined;
  return Object.keys(accentsProperties).reduce((acc: any, propName) => {
    const accent = accentsProperties[propName];
    let colorProp = newColour;

    if (colour && accent.alpha < 100) {
      colorProp = `${ colour }${ accent.alpha > 10 ? accent.alpha : `0${ accent.alpha }` }`;
    }

    acc[propName] = colorProp;
    return acc;
  }, {});
};

/**
 * Determines if a string is a valid colour
 */
const isValidColour = (colour: string | null | undefined): boolean =>
  typeof colour === 'string' && REGEXP_HEX.test(colour);

/**
 * Sets workbench options
 */
const setWorkbenchOptions = (config: any): Thenable<boolean> =>
  vscode.workspace.getConfiguration().update('workbench.colorCustomizations', config, true)
    .then(() => true, reason => vscode.window.showErrorMessage(reason));
/**
 * VSCode command
 */
export default async (accent?: string): Promise<boolean> => {
  const themeConfigCommon = getDefaultValues();
  const config: any = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

  switch (accent) {
    case consts.PURGE_KEY: {
      const newConfig = {
        ...config,
        ...assignColorCustomizations(undefined)
      };

      return setWorkbenchOptions(newConfig)
        .then(() => Promise.resolve(true));
    }
    default: {
      const newConfig = {
        ...config,
        ...assignColorCustomizations(themeConfigCommon.accents[accent])
      };

      return setWorkbenchOptions(newConfig)
        .then(() => Boolean(accent));
    }
  }

};
