import {isAutoApplyEnable, isReloadNotificationEnable} from './settings';
import {infoMessage} from './messages';
import {fixIcons} from '../commands';

export default async (doubleCheck: boolean) => {
  if (!doubleCheck) {
    return;
  }

  if (isAutoApplyEnable()) {
    return fixIcons();
  }

  if (!isReloadNotificationEnable()) {
    return;
  }

  const result = await infoMessage();

  if (result.reload) {
    return fixIcons();
  }
};
