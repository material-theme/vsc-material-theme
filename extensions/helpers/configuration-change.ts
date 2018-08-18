import {
  ConfigurationChangeEvent
} from 'vscode';
import {isMaterialThemeIcons, isMaterialTheme} from './settings';
import {getCurrentThemeIconsID, getCurrentThemeID} from './vscode';

import handleAutoapply from './handle-autoapply';

const onIconsChanged = () => {
  const currentIconsTheme = getCurrentThemeIconsID();
  return handleAutoapply(isMaterialThemeIcons(currentIconsTheme));
};

const onThemeChanged = () => {
  const currentTheme = getCurrentThemeID();
  return handleAutoapply(isMaterialTheme(currentTheme));
};

export const onChangeConfiguration = (event: ConfigurationChangeEvent) => {
  const isColorTheme = event.affectsConfiguration('workbench.colorTheme');
  const isIconTheme = event.affectsConfiguration('workbench.iconTheme');

  return isIconTheme ? onIconsChanged() :
          isColorTheme ? onThemeChanged() : null;
};
