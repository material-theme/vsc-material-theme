import * as vscode from 'vscode';

export function askForWindowReload(): Thenable<void> {
  const PROMPT_MESSAGE: string = 'Material Theme requires VS Code reload in order to display icons correctly.';
  const PROMPT_MESSAGE_CONFIRM: string = 'Ok, reload';
  const PROMPT_MESSAGE_CANCEL: string = 'I will do it later';

  return vscode.window.showInformationMessage(PROMPT_MESSAGE, PROMPT_MESSAGE_CONFIRM, PROMPT_MESSAGE_CANCEL)
    .then(response => {
      if (response === PROMPT_MESSAGE_CONFIRM) {
        reloadWindow();
      }
    }, err => {
      console.log(err);
    });
}

/**
 * Gets your current theme ID
 */
export function getCurrentThemeID(): string {
  return vscode.workspace.getConfiguration().get<string>('workbench.colorTheme');
}

/**
 * Gets your current icons theme ID
 */
export function getCurrentThemeIconsID(): string {
  return vscode.workspace.getConfiguration().get<string>('workbench.iconTheme');
}

/**
 * Set a specific id for icons
 */
export function setIconsID(id: string): Thenable<void> {
  return vscode.workspace.getConfiguration().update('workbench.iconTheme', id, true);
}

/**
 * Reloads current vscode window.
 */
export function reloadWindow(): void {
  vscode.commands.executeCommand('workbench.action.reloadWindow');
}
