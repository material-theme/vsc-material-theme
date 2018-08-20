import {
  ConfigurationChangeEvent
} from 'vscode';
import {isMaterialThemeIcons, isMaterialTheme, getAccent} from './settings';
import {getCurrentThemeIconsID, getCurrentThemeID} from './vscode';
import handleAutoapply from './handle-autoapply';
import {accentsSetter} from '../commands';

const onIconsChanged = () => {
  const currentIconsTheme = getCurrentThemeIconsID();
  return handleAutoapply(isMaterialThemeIcons(currentIconsTheme));
};

const onThemeChanged = () => {
  const currentTheme = getCurrentThemeID();
  return handleAutoapply(isMaterialTheme(currentTheme));
};

const onAccentChanged = () => {
  const currentTheme = getCurrentThemeID();
  const currentIconsTheme = getCurrentThemeIconsID();
  const currentAccent = getAccent();
  return accentsSetter(currentAccent)
    .then(() =>
      handleAutoapply(
        isMaterialTheme(currentTheme) && isMaterialThemeIcons(currentIconsTheme)
      )
    );
};

export const onChangeConfiguration = (event: ConfigurationChangeEvent) => {
  const isColorTheme = event.affectsConfiguration('workbench.colorTheme');
  const isIconTheme = event.affectsConfiguration('workbench.iconTheme');
  const isAccent = event.affectsConfiguration('materialTheme.accent');

  return isIconTheme ? onIconsChanged() :
          isColorTheme ? onThemeChanged() :
            isAccent ? onAccentChanged() : null;
};
