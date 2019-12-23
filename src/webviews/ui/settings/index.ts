import {ISettingsBootstrap} from '../../interfaces';
import accentsSelector from './lib/accents-selector';

const run = (): void => {
  bind();

  const {config, defaults} = window.bootstrap as ISettingsBootstrap;
  accentsSelector('[data-setting="accentSelector"]', defaults.accents, config.accent);

  console.log(defaults);
  console.log(config);
};

const bind = (): void => {
  document.querySelector('#fixIconsCTA').addEventListener('click', () => {
    console.log('Test click');
  });
};

run();
