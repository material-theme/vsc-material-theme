import * as vscode from 'vscode'

/**
 * Gets your current theme ID
 * @export
 * @returns {string}
 */
export function getCurrentThemeID(): string {
  return vscode.workspace.getConfiguration().get<string>('workbench.colorTheme');
}

/**
 * Gets your current icons theme ID
 * @export
 * @returns {string}
 */
export function getCurrentThemeIconsID(): string {
  return vscode.workspace.getConfiguration().get<string>('workbench.iconTheme');
}

/**
 * Reloads current vscode window.
 * @export
 */
export function reloadWindow(): void {
  vscode.commands.executeCommand('workbench.action.reloadWindow');
}