import {
  window as Window
} from 'vscode';

import * as ThemeCommands from './../commands';

const INFO_MESSAGE = 'You should reload the window for full activate the Material Theme.';
const OPTIONS = {ok: 'Reload now', cancel: 'Cancel'};

export const infoMessage = async () => {
  if (await Window.showInformationMessage(INFO_MESSAGE, OPTIONS.ok, OPTIONS.cancel) === OPTIONS.ok) {
    ThemeCommands.fixIcons();
  }
};
