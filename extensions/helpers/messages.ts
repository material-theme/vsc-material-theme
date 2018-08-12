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
  },
  INSTALLATION: {
    message: 'Thank you for installing Material Theme! Would you like to enable the auto-application (with window reload when needed) of the Material Theme icons?',
    options: {ok: 'Sure!', cancel: 'Nope :('}
  }
};

export const infoMessage = async () => {
  if (await Window.showInformationMessage(
    MESSAGES.INFO.message,
    ...MESSAGES.INFO.options as any
  ) === MESSAGES.INFO.options.ok) {
    ThemeCommands.fixIcons();
  }
};

export const changelogMessage = async () =>
  await Window.showInformationMessage(
    MESSAGES.CHANGELOG.message,
    ...MESSAGES.CHANGELOG.options as any
  ) === MESSAGES.CHANGELOG.options.ok;

export const installationMessage = async () =>
  await Window.showInformationMessage(
    MESSAGES.INSTALLATION.message,
    ...MESSAGES.INSTALLATION.options as any
  ) === MESSAGES.INSTALLATION.options.ok;
