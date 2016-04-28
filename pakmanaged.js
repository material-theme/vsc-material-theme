var global = Function("return this;")();
/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);
// pakmanager:material-theme
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  //
    //  Sublime Text theme compiler
    //  Developed with love by Mattia Astorino
    //
    //  Licensed under the MIT License
    //  https://www.apache.org/licenses/LICENSE-2.0
    //  ____________________________________________________________________________
    
    // Compiler settings
    // #############################################################################
    
    // Compiler settings
    var srcPath    = './src';
    var notifyLogo = './icon.png';
    
    
    // Modules loader
    var gulp       = require( 'gulp' ),
    path           = require( 'path' ),
    duration       = require( 'gulp-duration' ),
    gutil          = require( 'gulp-util' ),
    clean          = require( 'gulp-clean' ),
    runSequence    = require( 'run-sequence' ),
    concat_json    = require( "gulp-concat-json" ),
    rename         = require( 'gulp-rename' ),
    concat         = require( 'gulp-concat-json2js' ),
    wrap           = require( 'gulp-wrap' ),
    notify         = require( 'gulp-notify' );
    
    
    // Theme builder
    // #############################################################################
    
    
    gulp.task('themeBuilder', function () {
    
      gulp.src('./src/**.json')
      .pipe(concat())
      .pipe(wrap('[\r\n <%= contents %> \r\n]'))
      .pipe(rename({ extname: ".sublime-theme" }) )
      .pipe(gulp.dest('./'))
      .pipe(notify({
        title: "Material Theme",
        message: "Theme compiled",
        icon: path.join( __dirname, notifyLogo )
      }))
      .pipe(duration('Building theme'))
    })
    
    
    
    // cleaner
    gulp.task( 'build-clean', function () {
        return gulp.src( './test.txt', {read: false} )
        .pipe( clean( ) );
    });
    
    
    // Base watcher task
    // #############################################################################
    
    gulp.task( 'watch', function() {
        gulp.watch( srcPath + '/**/*.js', [ 'builder' ] );
    });
    
    
    // Registered tasks
    // #############################################################################
    
    /*gulp.task( 'default', [ 'clean', 'themeBuilder', 'watch' ] );*/
    gulp.task( 'default', function( callback ) {
      runSequence( 'build-clean', 'themeBuilder', 'watch', callback );
    });
    
    gulp.task( 'builder', function( callback ) {
      runSequence( 'build-clean', 'themeBuilder', callback );
    });
    
  provide("material-theme", module.exports);
}(global));