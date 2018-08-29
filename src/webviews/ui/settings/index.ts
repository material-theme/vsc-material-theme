import {SettingsBootstrap} from '../../interfaces';
import accentsSelector from './lib/accents-selector';

const run = () => {
  bind();

  const {config, defaults} = window.bootstrap as SettingsBootstrap;
  accentsSelector('[data-setting="accentSelector"]', defaults.accents, config.accent);

  console.log(defaults);
  console.log(config);
};

const bind = () => {
  document.querySelector('#fixIconsCTA').addEventListener('click', () => {
    console.log('Test click');
  });
};

run();
