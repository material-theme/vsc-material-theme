import {
  window as Window
} from 'vscode';

export const MESSAGES = {
  CHANGELOG: {
    message: 'Material Theme was updated. Check the release notes for more details.',
    options: {ok: 'Show me', cancel: 'Maybe later'}
  },
  INSTALLATION: {
    message: 'Thank you for using Material Theme!'
  }
};

export const installationMessage = async (): Promise<string> =>
  Window.showInformationMessage(
    MESSAGES.INSTALLATION.message
  );
