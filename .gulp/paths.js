/*global require,module*/
(function pathConfiguration(require, module) {
  'use strict';

const infos = require('../package.json')
  , today = new Date()
  , paths =  {
  "srcPath": './sources',
  "common": "./sources/settings/commons.json",
  "utils": "./utils"
};

module.exports = paths;
}(require, module));
