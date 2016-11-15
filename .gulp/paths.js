/*global require,module*/
(function pathConfiguration(require, module) {
  'use strict';

const infos = require('../package.json')
  , today = new Date()
  , paths =  {
    'src': './sources',
    'common': './sources/settings/commons.json',
    'utils': './utils',
    'schemes': './schemes',
    'widgets': './widgets',
    'extras': './extras'
  };

module.exports = paths;
}(require, module));
