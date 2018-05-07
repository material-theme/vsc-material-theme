import {
  workspace as Workspace,
  commands as Commands
} from 'vscode';

import {THEME_ACCENTS_SETTER} from './commands/accents-setter/index';
import {THEME_ICONS} from './commands/theme-icons/index';
import {shouldShowChangelog, showChangelog} from './helpers/changelog';
import {reloadWindow, getCurrentThemeID, setIconsID} from './helpers/vscode';

const isMaterialTheme = (currentTheme: string): boolean =>
  currentTheme.includes('Material Theme');

export function activate() {
  const config = Workspace.getConfiguration();

  // Listen on set theme: when the theme is Material Theme, just adjust icon and accent.
  Workspace.onDidChangeConfiguration(event => {
    const isColorTheme = event.affectsConfiguration('workbench.colorTheme');
    const currentTheme = getCurrentThemeID();
    // tslint:disable-next-line:early-exit
    if (isColorTheme && isMaterialTheme(currentTheme)) {
      setIconsID('eq-material-theme-icons')
        .then(() => THEME_ICONS().catch(error => console.trace(error)))
        .then(() => reloadWindow());
    }
  });

  // Delete old configuration, must remove with next major release
  if (config.has('materialTheme.cache.workbench')) {
    config.update('materialTheme.cache.workbench', undefined, true);
  }

  if (shouldShowChangelog()) {
    showChangelog();
  }

  // Registering commands
  Commands.registerCommand('materialTheme.setAccent', () => THEME_ACCENTS_SETTER());
  Commands.registerCommand('materialTheme.fixIcons', () =>
    THEME_ICONS()
      .then(() => reloadWindow())
      .catch(err => console.trace(err))
  );
  Commands.registerCommand('materialTheme.showChangelog', () => showChangelog());
}
