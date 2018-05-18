import * as vscode from 'vscode';

export default async (): Promise<void> => {
  // shows the quick pick dropdown and wait response
  const optionSelected = await vscode.window.showQuickPick(['Enable', 'Disable']);
  const isEnable = optionSelected === 'Enable';

  return Promise.resolve(vscode.workspace
    .getConfiguration().update('materialTheme.autoApplyIcons', isEnable, true)
  );
};
