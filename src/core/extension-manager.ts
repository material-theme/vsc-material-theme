import {extensions, workspace, window, Uri, ExtensionContext} from 'vscode';
import {posix} from 'path';
import {CONFIG_FILE_NAME, USER_CONFIG_FILE_NAME, MATERIAL_THEME_EXT_ID} from '../env';

type MaterialThemeConfig = {
  accents: Record<string, string>;
  accentsProperties: Record<string, {alpha: number; value: null }>;
  changelog?: { lastversion?: string };
};

type PackageJSON = {
  version: string;
  contributes: {
    themes: Array<{
      label: string;
    }>;
  };
};

type InstallationType = {
  firstInstall: boolean;
  update: boolean;
};

export interface IExtensionManager {
  init: (context: ExtensionContext) => Promise<void>;
  getPackageJSON: () => PackageJSON;
  getConfig: () => MaterialThemeConfig;
  getInstallationType: () => Record<string, unknown>;
  updateConfig: (config: Partial<MaterialThemeConfig>) => Promise<void>;
  VERSION_KEY: string;
}

class ExtensionManager implements IExtensionManager {
  get VERSION_KEY() {
    return 'vsc-material-theme.version';
  }

  installationType: InstallationType;
  private readonly configFileUri: Uri;
  private readonly userConfigFileUri: Uri;
  private configJSON: MaterialThemeConfig;

  constructor() {
    const extensionFolderUri = Uri.file(extensions.getExtension(MATERIAL_THEME_EXT_ID).extensionPath);
    this.configFileUri = extensionFolderUri.with({path: posix.join(extensionFolderUri.path, CONFIG_FILE_NAME)});
    this.userConfigFileUri = extensionFolderUri.with({path: posix.join(extensionFolderUri.path, USER_CONFIG_FILE_NAME)});
  }

  getPackageJSON(): PackageJSON {
    return extensions.getExtension(MATERIAL_THEME_EXT_ID).packageJSON;
  }

  getConfig(): MaterialThemeConfig {
    return this.configJSON;
  }

  getInstallationType(): InstallationType {
    return this.installationType;
  }

  async updateConfig(config: Partial<MaterialThemeConfig>): Promise<void> {
    const newConfig = {...this.configJSON, ...config};
    await workspace.fs.writeFile(this.configFileUri, Buffer.from(JSON.stringify(newConfig), 'utf-8'));
  }

  async init(context: ExtensionContext): Promise<void> {
    try {
      const packageJSON = this.getPackageJSON();
      const userConfig = await this.getUserConfig();
      const mementoStateVersion = context.globalState.get(this.VERSION_KEY);
      const themeNeverUsed = mementoStateVersion === undefined || typeof mementoStateVersion !== 'string';

      this.installationType = {
        update: userConfig && this.isVersionUpdate(userConfig, packageJSON),
        firstInstall: !userConfig && themeNeverUsed
      };

      // Theme not used before across devices
      if (themeNeverUsed) {
        await context.globalState.update(this.VERSION_KEY, packageJSON.version);
      }

      const configBuffer = await workspace.fs.readFile(this.configFileUri);
      const configContent = Buffer.from(configBuffer).toString('utf8');

      this.configJSON = JSON.parse(configContent) as MaterialThemeConfig;

      const userConfigUpdate = {...this.configJSON, changelog: {lastversion: packageJSON.version}};
      await workspace.fs.writeFile(
        this.userConfigFileUri,
        Buffer.from(JSON.stringify(userConfigUpdate), 'utf-8')
      );
    } catch (error) {
      this.configJSON = {accentsProperties: {}, accents: {}};
      await window
        .showErrorMessage(`Material Theme: there was an error while loading the configuration. Please retry or open an issue: ${String(error)}`);
    }
  }

  private isVersionUpdate(userConfig: MaterialThemeConfig, packageJSON: PackageJSON): boolean {
    const splitVersion = (input: string): {major: number; minor: number; patch: number} => {
      const [major, minor, patch] = input.split('.').map(i => parseInt(i, 10));
      return {major, minor, patch};
    };

    const versionCurrent = splitVersion(packageJSON.version);
    const versionOld = splitVersion(userConfig.changelog.lastversion);

    const update = (
      versionCurrent.major > versionOld.major ||
      versionCurrent.minor > versionOld.minor ||
      versionCurrent.patch > versionOld.patch
    );

    return update;
  }

  private async getUserConfig(): Promise<MaterialThemeConfig | undefined> {
    try {
      const configBuffer = await workspace.fs.readFile(this.userConfigFileUri);
      const configContent = Buffer.from(configBuffer).toString('utf8');
      return JSON.parse(configContent) as MaterialThemeConfig;
    } catch {}
  }
}

export const extensionManager = new ExtensionManager();
