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

var srcPath = "./sources";
var common = require(srcPath + '/settings/commons.json');
var envRegExp = new RegExp('([\'|\"]?__version__[\'|\"]?[ ]*[:|=][ ]*[\'|\"]?)(\\d+\\.\\d+\\.\\d+)(-[0-9A-Za-z\.-]+)?([\'|\"]?)', 'i');



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

gulp.task('clean:extras', function() {
  return del(['./extras/**/*.hidden-tmTheme', './extras/**/*.YAML-tmTheme']);
});

/*
 * > Generate CHANGELOG
 */

gulp.task('changelog', function () {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      // conventional-changelog options go here
      preset: 'angular',
      releaseCount: 1
    }))
    .pipe(gulp.dest('./'));
});

/*
 * > Bump Version
 */

gulp.task('bump', function(cb) {
  runSequence(
    'bump-pkg-version',
    'bump-env-version',
    function (error) {
      if (error) {
        console.log('\n[bump]'.bold.magenta + ' There was an issue bumping version:\n'.bold.red + error.message);
      } else {
        console.log('\n[bump]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }
      cb(error);
    }
  );
});

gulp.task('bump-pkg-version', function() {
  return gulp.src('./package.json')
    .pipe($.if((Object.keys(argv).length === 2), $.bump()))
    .pipe($.if(argv.patch, $.bump()))
    .pipe($.if(argv.minor, $.bump({ type: 'minor' })))
    .pipe($.if(argv.major, $.bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});


gulp.task('bump-env-version', function() {
  return gulp.src('./utils/info.py')
    .pipe($.if((Object.keys(argv).length === 2), $.bump({ regex: envRegExp })))
    .pipe($.if(argv.patch, $.bump({ regex: envRegExp })))
    .pipe($.if(argv.minor, $.bump({ type: 'minor', regex: envRegExp })))
    .pipe($.if(argv.major, $.bump({ type: 'major', regex: envRegExp })))
    .pipe(gulp.dest('./utils'));
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
        console.log('\n[release]'.bold.magenta + ' There was an issue releasing themes:\n'.bold.red + error.message);
      } else {
        console.log('\n[release]'.bold.magenta + ' Finished successfully \n'.bold.green);
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
    'build:extras',
    function (error) {
      if (error) {
        console.log('\n[build]'.bold.magenta + ' There was an issue building Material Theme:\n'.bold.red + error.message);
      } else {
        console.log('\n[build]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }

      cb(error);
    }
  );
});

/* >> Themes */

gulp.task('build:themes', ['clean:themes'], function() {
  return gulp.src(srcPath + '/themes/*.json')
    .pipe($.plumber(function(error) {
      console.log('\n[build:themes]'.bold.magenta + ' There was an issue building themes:\n'.bold.red + error.message);
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
      console.log('\n[build:themes]'.bold.magenta + ' Finished successfully \n'.bold.green);
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
        console.log('\n[build:schemes]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('process:schemes', function() {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.flatmap(function(stream, file) {
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
       console.log('\n[convert:schemes]'.bold.magenta + ' There was an issue converting color schemes:\n'.bold.red + error.message +
                   'To fix this error:\nAdd Sublime Text to the `PATH` and then install "PackageDev" via "Package Control.\nOpen Sublime Text before running the task. "'.bold.blue);
       this.emit('end');
    }))
    .pipe($.flatmap(function(stream) {
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
        console.log('\n[build:widgets]'.bold.magenta + ' Finished successfully \n'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('build:widget-themes', function() {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.flatmap(function(stream, file) {
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
    .pipe($.flatmap(function(stream, file) {
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


/* >> Extras */

gulp.task('build:extras', ['clean:extras'], function(cb) {
  runSequence(
    'process:extras',
    'convert:extras',
    function (error) {
      if (error) {
        console.log('\n[build:extras]'.bold.magenta + ' There was an issue building extras:\n'.bold.red + error.message);
      } else {
        console.log('\n[build:extras]'.bold.magenta + ' Finished successfully\n'.bold.green);
      }

      cb(error);
    }
  );
});

gulp.task('process:extras', function() {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.flatmap(function(stream, file) {
      var basename = path.basename(file.path, path.extname(file.path));

      return gulp.src(srcPath + '/extras/**/*.YAML-tmTheme')
        .pipe($.data(function() {
          var specific = require(file.path);

          return _.merge(common, specific);
        }))
        .pipe($.template())
        .pipe($.rename(function(scheme) {
          scheme.basename = basename;
        }))
        .pipe(gulp.dest('./extras'));
    }));
});

gulp.task('convert:extras', function() {
  return gulp.src('./extras/**/*.YAML-tmTheme')
    .pipe($.flatmap(function(stream) {
      sleep.sleep(2);

      return stream
        .pipe($.plumber(function(error) {
          console.log('[convert:extras]'.bold.magenta + ' There was an issue converting color extras:\n'.bold.red + error.message +
                      'To fix this error:\nAdd Sublime Text to the `PATH` and then install "PackageDev" via "Package Control".\nOpen Sublime Text before running the task.'.bold.blue);
          this.emit('end');
        }))
        .pipe($.exec('subl "<%= file.path %>" && subl --command "convert_file"'))
        .pipe($.exec.reporter());
    }));
});


/*
 * > Watch
 */

gulp.task('watch', ["build"], function() {
  gulp.watch(srcPath + '/themes/**/*.json', ['build:themes']);
  gulp.watch(srcPath + '/schemes/scheme.YAML-tmTheme', ['build:schemes']);
  gulp.watch(srcPath + '/extras/**/*.YAML-tmTheme', ['build:extras']);
  gulp.watch(srcPath + '/widgets/widget.*', ['build:widgets']);
  gulp.watch(srcPath + '/settings/**/*.json', ['build:schemes', 'build:widgets', 'build:themes']);
});


/*
 * > Default
 */

gulp.task('default', ['build']);
