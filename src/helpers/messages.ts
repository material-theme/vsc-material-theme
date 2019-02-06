import {
  window as Window
} from 'vscode';

const MESSAGES = {
  CHANGELOG: {
    message: 'Material Theme was updated. Check the release notes for more details.',
    options: {ok: 'Show me', cancel: 'Maybe later'}
  },
  INSTALLATION: {
    message: 'Thank you for using Material Theme!'
  }
};

export const changelogMessage = async () =>
  await Window.showInformationMessage(
    MESSAGES.CHANGELOG.message,
    MESSAGES.CHANGELOG.options.ok,
    MESSAGES.CHANGELOG.options.cancel
  ) === MESSAGES.CHANGELOG.options.ok;

export const installationMessage = async () =>
  await Window.showInformationMessage(
    MESSAGES.INSTALLATION.message
  );
