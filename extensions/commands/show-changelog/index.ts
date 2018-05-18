import * as path from 'path';
import * as vscode from 'vscode';

import {PATHS} from './../../consts/paths';

const previewFile = (): void => {
  const uri = vscode.Uri.file(path.join(PATHS.VSIX_DIR, './CHANGELOG.md'));
  vscode.commands.executeCommand('markdown.showPreview', uri);
};

export default (): void => {
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
