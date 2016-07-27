/* Sublime Text 3 Theme Builder

'use strict';

/*
 * > Plugins
 */

var gulp                       = require('gulp'),
    del                        = require('del'),
    path                       = require('path'),
    colors                     = require('colors'),
    sleep                      = require('sleep'),
    runSequence                = require('run-sequence'),
    conventionalChangelog      = require('gulp-conventional-changelog'),
    conventionalGithubReleaser = require('conventional-github-releaser'),
    replace                    = require('gulp-replace'),
    argv                       = require('yargs').argv,
    fs                         = require('fs'),
    _                          = require('lodash'),
    $                          = require('gulp-load-plugins')();


/*
 * > Settings
 */

var srcPath = "./.src";
var common = require(srcPath + '/settings/commons.json');


/*
 * > Clean
 */

gulp.task('clean:themes', function() {
  return del(['./*.sublime-theme']);
});

gulp.task('clean:schemes', function() {
  return del(['./schemes/*.tmTheme', './schemes/*.YAML-tmTheme']);
});

gulp.task('clean:widgets', function() {
  return del(['./widgets/*.stTheme', './widgets/*.sublime-settings']);
});


/*
 * > Generate CHANGELOG
 */

gulp.task('changelog', function () {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

/*
 * > Bump Version
 */

gulp.task('bump', function(cb) {
  runSequence(
    'bump-version',
    'commit-version',
    function (error) {
      if (error) {
        console.log('[bump]'.bold.magenta + ' There was an issue bumping version:\n'.bold.red + error.message);
      } else {
        console.log('[bump]'.bold.magenta + ' Finished successfully'.bold.green);
      }
      cb(error);
    }
  );
});

gulp.task('bump-version', function() {
  return gulp.src('./package.json')
    .pipe($.if((Object.keys(argv).length === 2), $.bump()))
    .pipe($.if(argv.patch, $.bump()))
    .pipe($.if(argv.minor, $.bump({ type: 'minor' })))
    .pipe($.if(argv.major, $.bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});


/*
 * > Git
 */

gulp.task('commit-version', function() {
  return gulp.src('.')
    .pipe($.git.add())
    .pipe($.git.commit('chore: bump version number'));
});

gulp.task('commit-changelog', function() {
  return gulp.src('.')
    .pipe($.git.add())
    .pipe($.git.commit('chore: update CHANGELOG.md'));
});

gulp.task('create-new-tag', function(cb) {
  var version = getPackageJsonVersion();

  $.git.tag('v' + version, 'version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    $.git.push('origin', 'master', {args: '--tags'}, cb);
  });

  function getPackageJsonVersion() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }
});


/*
 * > Github Release
 */

gulp.task('github-release', function(done) {
  conventionalGithubReleaser({
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, {
    preset: 'angular'
  }, done);
});


/*
 * > Release
 */

gulp.task('release', function(cb) {
  runSequence(
    'changelog',
    'commit-changelog',
    'create-new-tag',
    'github-release',
    function (error) {
      if (error) {
        console.log('[release]'.bold.magenta + ' There was an issue releasing themes:\n'.bold.red + error.message);
      } else {
        console.log('[release]'.bold.magenta + ' Finished successfully'.bold.green);
      }
      cb(error);
    }
  );
});


/*
 * > Build
 */

gulp.task('build', function(cb) {
  runSequence(
    'build:themes',
    'build:schemes',
    'build:widgets',
    function (error) {
      if (error) {
        console.log('[build]'.bold.magenta + ' There was an issue building Material Theme:\n'.bold.red + error.message);
      } else {
        console.log('[build]'.bold.magenta + ' Finished successfully'.bold.green);
      }

      cb(error);
    }
  );
});

/* >> Themes */

gulp.task('build:themes', ['clean:themes'], function() {
  return gulp.src(srcPath + '/themes/*.json')
    .pipe($.plumber(function(error) {
      console.log('[build:themes]'.bold.magenta + ' There was an issue building themes:\n'.bold.red + error.message);
      this.emit('end');
    }))
    .pipe($.include())
    .pipe($.data(function(file) {
      var specific = require(srcPath + '/settings/specific/' + path.basename(file.path));
      return _.merge(common, specific);
    }))
    .pipe($.template())
    .pipe($.rename(function(path) {
      path.basename = path.basename;
      path.extname = '.sublime-theme';
    }))
    .pipe(gulp.dest('./'))
    .on('end', function() {
      console.log('[build:themes]'.bold.magenta + ' Finished successfully'.bold.green);
    });
});


/* >> Schemes */

gulp.task('build:schemes', ['clean:schemes'], function(cb) {
  runSequence(
    'process:schemes',
    'convert:schemes',
    'escape:schemes',
    function (error) {
      if (error) {
        console.log('[build:schemes]'.bold.magenta + ' There was an issue building schemes:\n'.bold.red + error.message);
      } else {
        console.log('[build:schemes]'.bold.magenta + ' Finished successfully'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('process:schemes', function(cb) {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.foreach(function(stream, file) {
      var basename = path.basename(file.path, path.extname(file.path));

      return gulp.src(srcPath + '/schemes/scheme.YAML-tmTheme')
        .pipe($.data(function() {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename(function(scheme) {
          scheme.basename = basename;
        }))
        .pipe(gulp.dest('./schemes'));
    }));
});

gulp.task('convert:schemes', function() {
  return gulp.src('./schemes/*.YAML-tmTheme')
    .pipe($.plumber(function(error) {
       console.log('[convert:schemes]'.bold.magenta + ' There was an issue converting color schemes:\n'.bold.red + error.message +
                   'To fix this error:\nAdd Sublime Text to the `PATH` and then install "PackageDev" via "Package Control.\nOpen Sublime Text before running the task. "'.bold.blue);
       this.emit('end');
    }))
    .pipe($.foreach(function(stream, file) {
      sleep.sleep(2);

      return stream
        //.pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file"'))
        .pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file" && subl --command "hide_panel"'))
        .pipe($.exec.reporter());
    }));
});

// Escape CDATA characters
gulp.task('escape:schemes', function(){
  sleep.sleep(2);
  return gulp.src('./schemes/*.tmTheme')
    .pipe(replace('&lt;', '<'))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest('./schemes'));
});



/* >> Widgets */

gulp.task('build:widgets', ['clean:widgets'], function(cb) {
  runSequence(
    'build:widget-themes',
    'build:widget-settings',
    function (error) {
      if (error) {
        console.log('[build:widgets]'.bold.magenta + ' There was an issue building widgets:\n'.bold.red + error.message);
      } else {
        console.log('[build:widgets]'.bold.magenta + ' Finished successfully'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('build:widget-themes', function() {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.foreach(function(stream, file) {
      var basename = path.basename(file.path, path.extname(file.path));


      return gulp.src(srcPath + '/widgets/widget.stTheme')
        .pipe($.data(function() {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename(function(widget) {
          widget.basename = 'Widget - ' + basename;;
        }))
        .pipe(gulp.dest('./widgets'));
    }));
});

gulp.task('build:widget-settings', function() {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.foreach(function(stream, file) {
      var basename = path.basename(file.path, path.extname(file.path));

      return gulp.src(srcPath + '/widgets/widget.sublime-settings')
        .pipe($.data(function() {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename(function(widget) {
          widget.basename = 'Widget - ' + basename;
        }))
        .pipe(gulp.dest('./widgets'));
    }));
});


function getCache() {
  var cache = {};

  try {
    cache = JSON.parse(fs.readFileSync('./images.cache', 'utf8'));
  }
  catch(e) {
    console.log('No `images.cache` file!');
  }
  finally {
    return cache;
  }
}

gulp.task('optimize', function(cb) {
  runSequence(
    'optimize:assets',
    'optimize:icons',
    function (error) {
      if (error) {
        console.log('[optimize]'.bold.magenta + ' There was an issue optimizing images:\n'.bold.red + error.message);
      } else {
        console.log('[optimize]'.bold.magenta + ' Finished successfully'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('optimize:assets', function() {
  return gulp.src('./assets/**/*.png')
    .pipe($.imagemin([$.imagemin.optipng()], {verbose: true}))
    .pipe(gulp.dest('./assets'));
});

gulp.task('optimize:icons', function() {
  return gulp.src('./icons/**/*.png')
    .pipe($.imagemin([$.imagemin.optipng()], {verbose: true}))
    .pipe(gulp.dest('./icons'));
});


/*
 * > Watch
 */

gulp.task('watch', function() {
  gulp.watch(srcPath + '/themes/**/*.json', ['build:themes']);
  gulp.watch(srcPath + '/schemes/scheme.YAML-tmTheme', ['build:schemes']);
  gulp.watch(srcPath + '/widgets/widget.*', ['build:widgets']);
  gulp.watch(srcPath + '/settings/**/*.json', ['build:schemes', 'build:widgets', 'build:themes']);
});


/*
 * > Default
 */

gulp.task('default', ['build']);
