import {
  window as Window
} from 'vscode';

import * as ThemeCommands from './../commands';

const MESSAGES = {
  INFO: {
    message: 'Do you want to reload to apply Material Theme Icons to enjoy the full experience?',
    options: {ok: 'Yeah, releoad', cancel: 'No, thank you'}
  },
  CHANGELOG: {
    message: 'Material Theme was updated. Check the release notes for more details.',
    options: {ok: 'Show me', cancel: 'Maybe later'}
  }
};

export const infoMessage = async () => {
  if (await Window.showInformationMessage(MESSAGES.INFO.message, MESSAGES.INFO.options.ok, MESSAGES.INFO.options.cancel) === MESSAGES.INFO.options.ok) {
    ThemeCommands.fixIcons();
  }
};

export const changelogMessage = async () =>
  await Window.showInformationMessage(MESSAGES.CHANGELOG.message, MESSAGES.CHANGELOG.options.ok, MESSAGES.CHANGELOG.options.cancel) === MESSAGES.CHANGELOG.options.ok;
