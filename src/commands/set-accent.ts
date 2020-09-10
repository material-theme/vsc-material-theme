import {workspace, window} from 'vscode';
import {extensionManager} from '../core/extension-manager';
import {settingsManager} from '../core/settings-manager';

const PURGE_KEY = 'Remove accents';

const isValidColor = (color: string | null | undefined): boolean =>
  color && /^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);

const getThemeColorCustomizationsConfig = (accentColor?: string): Record<string, unknown> => {
  const {accentsProperties} = extensionManager.getConfig();
  const color = isValidColor(accentColor) ? accentColor : undefined;

  const themeColorCustomConfig = Object.keys(accentsProperties).reduce((acc: any, propName) => {
    const currentProp = accentsProperties[propName];
    const shouldModify = color && currentProp.alpha < 100;
    const colorProp = shouldModify ? `${color}${currentProp.alpha > 10 ? currentProp.alpha : `0${currentProp.alpha}`}` : color;
    acc[propName] = colorProp;
    return acc;
  }, {});

  return themeColorCustomConfig;
};

const updateColorCustomizationsConfig = async (config: any): Promise<boolean> => {
  try {
    await workspace.getConfiguration().update('workbench.colorCustomizations', config, true);
    return true;
  } catch (error) {
    await window.showErrorMessage(error);
  }
};

const quickPick = async (): Promise<string> => {
  const themeConfig = extensionManager.getConfig();
  const options: string[] = Object.keys(themeConfig.accents).concat(PURGE_KEY);
  return window.showQuickPick(options);
};

export const command = async (): Promise<void> => {
  const pkg = extensionManager.getPackageJSON();
  const currentThemeID = workspace.getConfiguration().get<string>('workbench.colorTheme');
  const isMaterialTheme = Boolean(pkg.contributes.themes.find(theme => theme.label === currentThemeID));

  if (!isMaterialTheme) {
    return;
  }

  const themeConfig = extensionManager.getConfig();
  const currentColorCustomizationsConfig: any = workspace.getConfiguration().get('workbench.colorCustomizations');
  const accent = await quickPick();
  let config = {};

  if (accent === PURGE_KEY) {
    const {[currentThemeID]: _, ...rest} = currentColorCustomizationsConfig;
    config = rest;
  } else {
    config = {
      ...currentColorCustomizationsConfig,
      [`[${currentThemeID}]`]: {
        ...getThemeColorCustomizationsConfig(themeConfig.accents[accent])
      }
    };
  }

  await updateColorCustomizationsConfig(config);
  await settingsManager.updateSetting('accent', accent);
};
