import {getDefaultValues, getPackageJSON} from './fs';
import {IInstallationType} from '../interfaces/iinstallation-type';

const splitVersion = (input: string): {major: number; minor: number; patch: number} => {
  const [major, minor, patch] = input.split('.').map(i => parseInt(i, 10));
  return {major, minor, patch};
};

export default (): IInstallationType => {
  const out: IInstallationType = {
    isUpdate: false,
    isFirstInstall: false
  };

  const defaults = getDefaultValues();
  const packageJSON = getPackageJSON();

  const isFirstInstall = defaults.changelog === undefined ||
     (defaults.changelog !== undefined && typeof defaults.changelog.lastversion !== 'string');

  if (isFirstInstall) {
    return {...out, isFirstInstall};
  }

  const versionCurrent = splitVersion(packageJSON.version);
  const versionOld = isFirstInstall ? null : splitVersion(defaults.changelog.lastversion);

  const isUpdate = !versionOld ||
    versionCurrent.major > versionOld.major ||
    versionCurrent.minor > versionOld.minor ||
    versionCurrent.patch > versionOld.patch;

  return {...out, isUpdate};
};
