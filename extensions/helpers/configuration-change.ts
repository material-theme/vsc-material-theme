import {
  ConfigurationChangeEvent
} from 'vscode';
import {getCustomSettings, isMaterialThemeIcons, isAutoApplyEnable, isMaterialTheme} from './settings';
import {getCurrentThemeIconsID, getCurrentThemeID} from './vscode';

import * as ThemeCommands from './../commands';
import {infoMessage} from './messages';

const icons = () => isAutoApplyEnable() ? ThemeCommands.fixIcons() : infoMessage();

const onIconsChanged = () => {
  const customSettings = getCustomSettings();
  if (customSettings.fixIconsRunning) {
    return;
  }

  const currentIconsTheme = getCurrentThemeIconsID();
  if (isMaterialThemeIcons(currentIconsTheme)) {
    return icons();
  }
};

const onThemeChanged = () => {
  const currentTheme = getCurrentThemeID();
  if (isMaterialTheme(currentTheme)) {
    return icons();
  }
};

export const onChangeConfiguration = (event: ConfigurationChangeEvent) => {
  const isColorTheme = event.affectsConfiguration('workbench.colorTheme');
  const isIconTheme = event.affectsConfiguration('workbench.iconTheme');

  if (isIconTheme) {
    return onIconsChanged();
  }

  if (isColorTheme) {
    return onThemeChanged();
  }
};
