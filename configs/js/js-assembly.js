const gulplog = require('gulplog');
const named = require('vinyl-named');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const paths = require('../paths');

const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const webpack2 = require('webpack');
const webpackOption = require('../../webpack.config.babel');

const $ = gulpLoadPlugins();

module.exports = options => (callback) => {
  const isDevelopment = process.env.NODE_ENV.trim() === 'development';
  const jsSrcFiles = paths.src.js.files;
  const jsDestFolder = isDevelopment ? paths.build.js.folder : paths.prod.js.folder;

  const license = '/*\n' +
                  ' * © 2005-2017 Intlock Ltd All Rights Reserved.\n' +
                  ' * Without our prior written permission, you may not copy,\n' +
                  ' * modify, alter, publish, broadcast, distribute, sell or transfer\n' +
                  ' * any material on this source or the underlying software code whether in whole or in part.\n' +
                  '*/\n\n';
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;
    if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return;  // emit('error', err) in webpack-stream
    }
    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({colors: true}));
  }

  /** task's options */
  const srcFiles = options.src || jsSrcFiles;
  const dest = options.dest || jsDestFolder;
    /** js assembly task */
  return gulp.src(srcFiles)
    .pipe($.plumber({
      errorHandler: $.notify.onError(err => ({
        title: 'Webpack',
        message: err.message
      }))
    }))
  .pipe(named())
  .pipe(webpackStream(webpackOption, webpack2, done))
  .pipe($.if(function (file) {
    // exclude from minification ca-debug and es5-shim files
    return !isDevelopment && !/ca-debug.js|es5-shim.js/.test(file.path);
  }, $.uglify({
    mangle: false,
    compress: {
      screw_ie8: false,
      warnings: false
    },
    output: {
      quote_keys: true,
      screw_ie8: false
    }
  })))
  .pipe($.if(function(file) {
    // exclude es5-shim from banner
    return !/es5-shim.js/.test(file.path);
  }, $.banner(license)))
  .pipe(gulp.dest(dest))
  .on('data', () => {
    if (firstBuildReady) {
      callback();
    }
  });
};
