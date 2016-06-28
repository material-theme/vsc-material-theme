'use strict';

var crypto = require('crypto');
var through = require('through2');
var path = require('path');
var fs = require('fs');
var slash = require('slash');

var GLOBAL_CACHE = {};

module.exports = function(options) {
  options = options || {};

  var cache = options.cache || GLOBAL_CACHE;
  var firstPass = options.firstPass === true;

  return through.obj(function(file, encoding, done) {
    if (file.contents === null) {
      if (file.stat.isFile()) {
        this.push(file);
      }

      return done();
    }

    var filepath = './' + slash(path.relative('.', file.path));

    var newHash = crypto.createHash('sha1').update(file.contents).digest('hex');
    var currentHash = cache[filepath];
    cache[filepath] = newHash;

    if ((!currentHash && firstPass) || (currentHash && currentHash !== newHash)) {
      this.push(file);
    }

    done();
  }, function(done) {
    fs.writeFileSync('./images.cache', JSON.stringify(cache, null, 2), 'utf-8');

    done();
  });
};