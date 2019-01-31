import * as vscode from 'vscode';

/**
 * Gets your current theme ID
 */
export function getCurrentThemeID(): string {
  return vscode.workspace.getConfiguration().get<string>('workbench.colorTheme');
}

/**
 * Reloads current vscode window.
 */
export function reloadWindow(): void {
  vscode.commands.executeCommand('workbench.action.reloadWindow');
}
