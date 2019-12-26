
import {workspace} from 'vscode';

type ThemeCustomSettings = {
  accent?: string;
};

export interface ISettingsManager {
  getSettings: () => ThemeCustomSettings;
}

class SettingsManager implements ISettingsManager {
  private readonly customSettings: ThemeCustomSettings;

  constructor() {
    this.customSettings = workspace.getConfiguration().get<ThemeCustomSettings>('materialTheme', {});
  }

  getSettings(): ThemeCustomSettings {
    return this.customSettings;
  }

  async updateSetting(key: keyof ThemeCustomSettings, value: string): Promise<void> {
    await workspace.getConfiguration().update(`materialTheme.${key}`, value, true);
  }
}

export const settingsManager = new SettingsManager();
