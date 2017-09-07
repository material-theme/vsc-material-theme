import * as path from 'path';

import { getDefaultValues, getPackageJSON, writeFile } from "./fs";
import { PATHS } from "../consts/paths";


function splitVersion(input: string): { major: number, minor: number, patch: number } {
  let [ major, minor, patch ] = input.split('.').map(i => parseInt(i));
  return { major, minor, patch };
}

export function showChangelog(): void {

}

export function shouldShowChangelog(): boolean {
  let defaults = getDefaultValues();
  let out: boolean;
  let packageJSON = getPackageJSON();

  if (defaults.changelog == undefined || (defaults.changelog !== undefined && typeof defaults.changelog.lastversion !== 'string')) {
    defaults.changelog = {
      lastversion: packageJSON.version,
      stopShowingChangelog: false
    }
    out = true;
  } else {
    let versionCurrent = splitVersion(packageJSON.version);
    let versionOld = splitVersion(defaults.changelog.lastversion);

    out = versionCurrent.major !== versionOld.major || versionCurrent.minor !== versionOld.minor || versionCurrent.patch !== versionOld.patch;

    defaults.changelog.lastversion = packageJSON.version;
  }

  writeFile(path.join(PATHS.VSIX_DIR, './extensions/defaults.json'), JSON.stringify(defaults, null, 2));

  return out;
}