import {isAutoApplyEnable, isReloadNotificationEnable} from './settings';
import {infoMessage} from './messages';
import {fixIcons} from '../commands';

let fixIconsRunning: boolean = false;

export default async (doubleCheck: boolean) => {
  if (!doubleCheck || fixIconsRunning) {
    return;
  }

  if (isAutoApplyEnable()) {
    fixIconsRunning = true;
    return fixIcons().then(() => fixIconsRunning = false);
  }

  if (!isReloadNotificationEnable()) {
    return;
  }

  const result = await infoMessage();

  if (result.reload) {
    fixIconsRunning = true;
    return fixIcons().then(() => fixIconsRunning = false);
  }
};
