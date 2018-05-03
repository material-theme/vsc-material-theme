import * as vscode from 'vscode';

import {IAccentCustomProperty} from './../../interfaces/iaccent-custom-property';
import {IGenericObject} from './../../interfaces/igeneric-object';
import {
  updateAccent,
  isMaterialTheme,
  isMaterialThemeIcons
} from './../../helpers/settings';
import {
  getCurrentThemeID,
  getCurrentThemeIconsID,
  reloadWindow
} from './../../helpers/vscode';
import {getDefaultValues} from './../../helpers/fs';
import {THEME_ICONS} from './../theme-icons/index';

const REGEXP_HEX: RegExp = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

const accentsProperties: IGenericObject <IAccentCustomProperty> = {
  'activityBarBadge.background': {
    alpha: 100,
    value: undefined
  },
  'list.activeSelectionForeground': {
    alpha: 100,
    value: undefined
  },
  'list.inactiveSelectionForeground': {
    alpha: 100,
    value: undefined
  },
  'list.highlightForeground': {
    alpha: 100,
    value: undefined
  },
  'scrollbarSlider.activeBackground': {
    alpha: 50,
    value: undefined
  },
  'editorSuggestWidget.highlightForeground': {
    alpha: 100,
    value: undefined
  },
  'textLink.foreground': {
    alpha: 100,
    value: undefined
  },
  'progressBar.background': {
    alpha: 100,
    value: undefined
  },
  'pickerGroup.foreground': {
    alpha: 100,
    value: undefined
  },
  'tab.activeBorder': {
    alpha: 100,
    value: undefined
  },
  'notificationLink.foreground': {
    alpha: 100,
    value: undefined
  }
};

/**
 * Assigns colours
 */
const assignColorCustomizations = (colour: string, config: any): void => {
  const newColour = isValidColour(colour) ? colour : undefined;

  Object.keys(accentsProperties).forEach(propertyName => {
    const accent: IAccentCustomProperty = accentsProperties[propertyName];
    let colorProp = newColour;

    if (colour && accent.alpha < 100) {
      colorProp = `${ colour }${ accent.alpha > 10 ? accent.alpha : `0${ accent.alpha }` }`;
    }

    if (accent) {
      config[propertyName] = colorProp;
    }
  });
};

/**
 * Determines if a string is a valid colour
 */
const isValidColour = (colour: string | null | undefined): boolean =>
  typeof colour === 'string' && REGEXP_HEX.test(colour);

/**
 * Sets workbench options
 */
const setWorkbenchOptions = (accentSelected: string | undefined, config: any): void => {
  vscode.workspace.getConfiguration().update('workbench.colorCustomizations', config, true).then(() => {
    const themeID = getCurrentThemeID();
    const themeIconsID = getCurrentThemeIconsID();

    updateAccent(accentSelected).then(() => {
      if (isMaterialTheme(themeID) && isMaterialThemeIcons(themeIconsID)) {
        THEME_ICONS().then(() => reloadWindow());
      }
    });
  }, reason => {
    vscode.window.showErrorMessage(reason);
  });
};

/**
 * VSCode command
 */
export const THEME_ACCENTS_SETTER = () => {
  const themeConfigCommon = getDefaultValues();
  // shows the quick pick dropdown
  const options: string[] = Object.keys(themeConfigCommon.accents);
  const purgeColourKey: string = 'Remove accents';

  options.push(purgeColourKey);

  vscode.window.showQuickPick(options).then(accentSelected => {
    if (accentSelected === null || accentSelected === undefined) {
      return;
    }

    const config: any = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

    switch (accentSelected) {
      case purgeColourKey:
        assignColorCustomizations(undefined, config);
        setWorkbenchOptions(undefined, config);
        break;
      default:
        assignColorCustomizations(themeConfigCommon.accents[accentSelected], config);
        setWorkbenchOptions(accentSelected, config);
    }
  });
};
