import * as path from 'path';
import {getDefaultValues, getPackageJSON, writeFile} from './fs';

import {IDefaults} from './../interfaces/idefaults';

const writeDefaults = (defaults: IDefaults) =>
  writeFile(path.join('./extensions/defaults.json'), JSON.stringify(defaults, null, 2));

export default (): void => {
  const defaults = getDefaultValues();
  const packageJSON = getPackageJSON();

  const newChangelog = {...defaults.changelog, lastversion: packageJSON.version};
  const newDefaults = {...defaults, changelog: newChangelog};
  writeDefaults(newDefaults);
};
