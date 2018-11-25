import {
  workspace as Workspace,
  commands as Commands,
  ExtensionContext
} from 'vscode';

import * as ThemeCommands from './commands';
import {setCustomSetting, updateAccent} from './helpers/settings';
import {onChangeConfiguration} from './helpers/configuration-change';
import {changelogMessage, installationMessage} from './helpers/messages';
import checkInstallation from './helpers/check-installation';
import writeChangelog from './helpers/write-changelog';
import {ReleaseNotesWebview} from './webviews/ReleaseNotes';

export async function activate(context: ExtensionContext) {
  const config = Workspace.getConfiguration();
  const installationType = checkInstallation();
  const releaseNotesView = new ReleaseNotesWebview(context);

  writeChangelog();

  // Listen on set theme: when the theme is Material Theme, just adjust icon and accent.
  Workspace.onDidChangeConfiguration(onChangeConfiguration);

  // Delete old configuration, must remove with next major release
  if (config.has('materialTheme.cache.workbench')) {
    config.update('materialTheme.cache.workbench', undefined, true);
  }

  if (installationType.isFirstInstall) {
    const enableAutoApply = await installationMessage();
    await setCustomSetting('autoApplyIcons', enableAutoApply);
    // Set true always on new installation
    await setCustomSetting('showReloadNotification', true);
  }

  const shouldShowChangelog = (installationType.isFirstInstall || installationType.isUpdate) && await changelogMessage();
  if (shouldShowChangelog) {
    releaseNotesView.show();
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', async () => {
    const accentPicked = await ThemeCommands.accentsQuickPick();
    await updateAccent(accentPicked);
  });
  Commands.registerCommand('materialTheme.fixIcons', () => ThemeCommands.fixIcons());
  Commands.registerCommand('materialTheme.toggleApplyIcons', () => ThemeCommands.toggleApplyIcons());

  Commands.registerCommand('materialTheme.showReleaseNotes', () => releaseNotesView.show());
}
