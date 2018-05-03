import * as path from 'path';
import * as vscode from 'vscode';

import {IDefaults} from './../interfaces/idefaults';

import {getDefaultValues, getPackageJSON, writeFile} from './fs';
import {PATHS} from './../consts/paths';

const previewFile = (): void => {
  const uri = vscode.Uri.file(path.join(PATHS.VSIX_DIR, './CHANGELOG.md'));
  vscode.commands.executeCommand('markdown.showPreview', uri);
};

const splitVersion = (input: string): {major: number; minor: number; patch: number} => {
  const [major, minor, patch] = input.split('.').map(i => parseInt(i, 10));
  return {major, minor, patch};
};

const writeDefaults = (defaults: IDefaults) =>
  writeFile(path.join('./extensions/defaults.json'), JSON.stringify(defaults, null, 2));

export const showChangelog = (): void => {
  const extname: string = 'vscode.markdown';
  const md = vscode.extensions.getExtension<any>(extname);

  if (md === undefined) {
    console.warn(`Ext not found ${ extname }`);
    return;
  }

  if (md.isActive) {
    return previewFile();
  }

  md.activate()
    .then(() => previewFile(),
    reason => console.warn(reason)
  );
};

export const shouldShowChangelog = (): boolean => {
  const defaults = getDefaultValues();
  const packageJSON = getPackageJSON();

  const defaultsNotPresent = defaults.changelog === undefined ||
     (defaults.changelog !== undefined && typeof defaults.changelog.lastversion !== 'string');

  const versionCurrent = splitVersion(packageJSON.version);
  const versionOld = defaultsNotPresent ? null : splitVersion(defaults.changelog.lastversion);

  const out = !versionOld ||
    versionCurrent.major > versionOld.major ||
    versionCurrent.minor > versionOld.minor ||
    versionCurrent.patch > versionOld.patch;

  const newChangelog = {...defaults.changelog, lastversion: packageJSON.version};
  const newDefaults = {...defaults, changelog: newChangelog};
  writeDefaults(newDefaults);

  return out;
};
