import {WebviewController} from './Webview';
import {
  workspace as Workspace,

  ExtensionContext
} from 'vscode';
import {SettingsBootstrap} from './interfaces';
import {getCustomSettings} from '../../extensions/helpers/settings';
import {getDefaultValues} from '../../extensions/helpers/fs';

export class SettingsWebview extends WebviewController<SettingsBootstrap> {
  constructor(context: ExtensionContext) {
    super(context);
  }

  get filename(): string {
    return 'settings.html';
  }

  get id(): string {
    return 'materialTheme.settings';
  }

  get title(): string {
    return 'Material Theme Settings';
  }

  private getAvailableScopes(): ['user' | 'workspace', string][] {
    const scopes: ['user' | 'workspace', string][] = [['user', 'User']];
    return scopes
      .concat(
        Workspace.workspaceFolders !== undefined && Workspace.workspaceFolders.length ?
          ['workspace', 'Workspace'] :
          []
        );
  }

  /**
   * This will be called by the WebviewController when init the view
   * passing as `window.bootstrap` to the view.
   */
  getBootstrap() {
    return {
      config: getCustomSettings(),
      defaults: getDefaultValues(),
      scope: 'user',
      scopes: this.getAvailableScopes()
    } as SettingsBootstrap;
  }
}
