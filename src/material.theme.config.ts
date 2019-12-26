import {
  commands as Commands,
  ExtensionContext
} from 'vscode';

import * as ThemeCommands from './commands';
import {installationMessage} from './helpers/messages';
import {ReleaseNotesWebview} from './webviews/ReleaseNotes';
import {changelogManager} from './core/changelog-manager';
import {extensionManager} from './core/extension-manager';

export async function activate(context: ExtensionContext): Promise<void> {
  const releaseNotesView = new ReleaseNotesWebview(context);
  const installationType = extensionManager.getInstallationType();

  // TODO: BEFORE RELEASE add new message for new install because with the refactor also updates will be considered as new install, for the first time
  if (installationType.firstInstall) {
    await installationMessage();
  }

  if ((installationType.firstInstall || installationType.update) && await changelogManager.askShowChangelog()) {
    await releaseNotesView.show();
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', ThemeCommands.setAccent);
  Commands.registerCommand('materialTheme.showReleaseNotes', async () => releaseNotesView.show());
}
