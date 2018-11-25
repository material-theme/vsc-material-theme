import * as vscode from 'vscode';
import {getDefaultValues} from '../../helpers/fs';
import consts from './consts';

export default async () => {
  const themeConfigCommon = getDefaultValues();
  const options: string[] = Object.keys(themeConfigCommon.accents).concat(consts.PURGE_KEY);
  return vscode.window.showQuickPick(options);
};
