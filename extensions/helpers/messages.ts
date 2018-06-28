import {
  window as Window
} from 'vscode';

import * as ThemeCommands from './../commands';

const MESSAGES = {
  INFO: {
    message: 'You should reload the window for full activate the Material Theme.',
    options: {ok: 'Reload now', cancel: 'Cancel'}
  },
  CHANGELOG: {
    message: 'Material Theme was updated. Check the changelog for more details!',
    options: {ok: 'Show changelog', cancel: 'Maybe later'}
  }
};

export const infoMessage = async () => {
  if (await Window.showInformationMessage(MESSAGES.INFO.message, MESSAGES.INFO.options.ok, MESSAGES.INFO.options.cancel) === MESSAGES.INFO.options.ok) {
    ThemeCommands.fixIcons();
  }
};

export const changelogMessage = async () =>
  await Window.showInformationMessage(MESSAGES.CHANGELOG.message, MESSAGES.CHANGELOG.options.ok, MESSAGES.CHANGELOG.options.cancel) === MESSAGES.CHANGELOG.options.ok;
