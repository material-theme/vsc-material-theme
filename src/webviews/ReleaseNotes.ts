import {WebviewController} from './Webview';

export class ReleaseNotesWebview extends WebviewController<Record<string, unknown>> {
  get filename(): string {
    return 'release-notes.html';
  }

  get id(): string {
    return 'materialTheme.releaseNotes';
  }

  get title(): string {
    return 'Material Theme Release Notes';
  }

  /**
   * This will be called by the WebviewController when init the view
   * passing as `window.bootstrap` to the view.
   */
  getBootstrap(): Record<string, unknown> {
    return {};
  }
}
