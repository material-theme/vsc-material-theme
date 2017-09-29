import * as path from 'path';
import * as vscode from 'vscode';

import { getDefaultValues, getPackageJSON, writeFile } from "./fs";
import { PATHS } from '../consts/paths';

function previewFile(): void {
  let uri = vscode.Uri.file(path.join(PATHS.VSIX_DIR, './CHANGELOG.md'));

  vscode.commands.executeCommand('markdown.showPreview', uri);

}

function splitVersion(input: string): { major: number, minor: number, patch: number } {
  let [ major, minor, patch ] = input.split('.').map(i => parseInt(i));
  return { major, minor, patch };
}

export function showChangelog(): void {
  let extname: string = 'Microsoft.vscode-markdown';
  let md = vscode.extensions.getExtension<any>(extname);

  if (md === undefined) {
    console.warn(`Ext not found ${ extname }`)
    return;
  }

  if (md.isActive) {
    previewFile();
  } else {
    md.activate().then(() => {
      previewFile();
    }, reason => {
      console.warn(reason);
    });
  }
}

export function shouldShowChangelog(): boolean {
  let defaults = getDefaultValues();
  let out: boolean;
  let packageJSON = getPackageJSON();

  if (defaults.changelog == undefined || (defaults.changelog !== undefined && typeof defaults.changelog.lastversion !== 'string')) {
    defaults.changelog = {
      lastversion: packageJSON.version
    }
    out = true;
  } else {
    let versionCurrent = splitVersion(packageJSON.version);
    let versionOld = splitVersion(defaults.changelog.lastversion);

    out = versionCurrent.major > versionOld.major || versionCurrent.minor > versionOld.minor || versionCurrent.patch > versionOld.patch;

    defaults.changelog.lastversion = packageJSON.version;
  }

  writeFile(path.join('./extensions/defaults.json'), JSON.stringify(defaults, null, 2));

  return out;
}