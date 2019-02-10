import {
  commands as Commands,
  ExtensionContext
} from 'vscode';

import * as ThemeCommands from './commands';
import {updateAccent} from './helpers/settings';
import {changelogMessage, installationMessage} from './helpers/messages';
import checkInstallation from './helpers/check-installation';
import writeChangelog from './helpers/write-changelog';
import {ReleaseNotesWebview} from './webviews/ReleaseNotes';

export async function activate(context: ExtensionContext) {
  const installationType = checkInstallation();
  const releaseNotesView = new ReleaseNotesWebview(context);

  writeChangelog();

  if (installationType.isFirstInstall) {
    await installationMessage();
  }

  const shouldShowChangelog = (installationType.isFirstInstall || installationType.isUpdate) && await changelogMessage();
  if (shouldShowChangelog) {
    releaseNotesView.show();
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', async () => {
    const accentPicked = await ThemeCommands.accentsQuickPick();
    await ThemeCommands.accentsSetter(accentPicked);
    await updateAccent(accentPicked);
  });

  Commands.registerCommand('materialTheme.showReleaseNotes', () => releaseNotesView.show());
}
