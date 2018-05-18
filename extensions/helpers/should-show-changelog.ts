import * as path from 'path';

import {IDefaults} from './../interfaces/idefaults';

import {getDefaultValues, getPackageJSON, writeFile} from './fs';

const splitVersion = (input: string): {major: number; minor: number; patch: number} => {
  const [major, minor, patch] = input.split('.').map(i => parseInt(i, 10));
  return {major, minor, patch};
};

const writeDefaults = (defaults: IDefaults) =>
  writeFile(path.join('./extensions/defaults.json'), JSON.stringify(defaults, null, 2));

export default (): boolean => {
  const defaults = getDefaultValues();
  const packageJSON = getPackageJSON();

  const defaultsNotPresent = defaults.changelog === undefined ||
     (defaults.changelog !== undefined && typeof defaults.changelog.lastversion !== 'string');

  const versionCurrent = splitVersion(packageJSON.version);
  const versionOld = defaultsNotPresent ? null : splitVersion(defaults.changelog.lastversion);

  const out = !versionOld ||
    versionCurrent.major > versionOld.major ||
    versionCurrent.minor > versionOld.minor ||
    versionCurrent.patch > versionOld.patch;

  const newChangelog = {...defaults.changelog, lastversion: packageJSON.version};
  const newDefaults = {...defaults, changelog: newChangelog};
  writeDefaults(newDefaults);

  return out;
};
