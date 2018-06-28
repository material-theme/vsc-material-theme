import {
  workspace as Workspace,
  commands as Commands
} from 'vscode';

import * as ThemeCommands from './commands';
import {isAutoApplyEnable} from './helpers/settings';
import {onChangeConfiguration} from './helpers/configuration-change';
import {infoMessage, changelogMessage} from './helpers/messages';
import shouldShowChangelog from './helpers/should-show-changelog';

export async function activate() {
  const config = Workspace.getConfiguration();

  // Listen on set theme: when the theme is Material Theme, just adjust icon and accent.
  Workspace.onDidChangeConfiguration(onChangeConfiguration);

  // Delete old configuration, must remove with next major release
  if (config.has('materialTheme.cache.workbench')) {
    config.update('materialTheme.cache.workbench', undefined, true);
  }

  if (shouldShowChangelog()) {
    const show = await changelogMessage();
    if (show) {
      ThemeCommands.showChangelog();
    }
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', async () => {
    const wasSet = await ThemeCommands.accentsSetter();

    if (wasSet) {
      return isAutoApplyEnable() ? ThemeCommands.fixIcons() : infoMessage();
    }
  });
  Commands.registerCommand('materialTheme.fixIcons', () => ThemeCommands.fixIcons());
  Commands.registerCommand('materialTheme.toggleApplyIcons', () => ThemeCommands.toggleApplyIcons());
  Commands.registerCommand('materialTheme.showChangelog', () => ThemeCommands.showChangelog());
}
