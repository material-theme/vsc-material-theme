import {
  window as Window
} from 'vscode';

const MESSAGES = {
  INFO: {
    message: 'Do you want to reload to apply Material Theme Icons to enjoy the full experience?',
    options: {ok: 'Yeah, reload', cancel: 'No, thank you'}
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
  const result = await Window.showInformationMessage(
    MESSAGES.INFO.message,
    MESSAGES.INFO.options.ok,
    MESSAGES.INFO.options.cancel
  );

  switch (result) {
    case MESSAGES.INFO.options.ok:
      return {reload: true};
    default:
      return {};
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
    MESSAGES.INSTALLATION.message,
    MESSAGES.INSTALLATION.options.ok,
    MESSAGES.INSTALLATION.options.cancel,
  ) === MESSAGES.INSTALLATION.options.ok;
