import {
  commands as Commands,
  ExtensionContext
} from 'vscode';

import * as ThemeCommands from './commands';
import {ReleaseNotesWebview} from './webviews/ReleaseNotes';
import {changelogManager} from './core/changelog-manager';
import {extensionManager} from './core/extension-manager';

export async function activate(context: ExtensionContext): Promise<void> {
  context.globalState.setKeysForSync([extensionManager.VERSION_KEY]);
  await extensionManager.init(context);
  const releaseNotesView = new ReleaseNotesWebview(context);
  const installationType = extensionManager.getInstallationType();

  if ((installationType.firstInstall || installationType.update) && await changelogManager.askShowChangelog()) {
    await releaseNotesView.show();
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', ThemeCommands.setAccent);
  Commands.registerCommand('materialTheme.showReleaseNotes', async () => releaseNotesView.show());
}
