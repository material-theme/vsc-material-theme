import {window} from 'vscode';
import {MESSAGES} from '../helpers/messages';

type AskMessage = {
  message: string;
  options: {
    ok: string;
    cancel: string;
  };
};

class ChangelogManager {
  private readonly askMessage: AskMessage;

  constructor(message: AskMessage) {
    this.askMessage = message;
  }

  async askShowChangelog(): Promise<boolean> {
    return await window.showInformationMessage(
      this.askMessage.message,
      this.askMessage.options.ok,
      this.askMessage.options.cancel
    ) === this.askMessage.options.ok;
  }
}

export const changelogManager = new ChangelogManager(MESSAGES.CHANGELOG);
