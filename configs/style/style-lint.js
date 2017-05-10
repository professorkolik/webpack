const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const paths = require('../paths');

const $ = gulpLoadPlugins();
module.exports = options => () => {
  const styleSrcFiles = [paths.src.style.files, '!./src/**/*sprite*.scss'];
  const isDevelopment = process.env.NODE_ENV.trim() === 'development';
  /** task options */
  const srcFiles = options.src || styleSrcFiles;
  /** template assembly task */
  return gulp.src(srcFiles)
  .pipe($.if(isDevelopment, $.plumber({
    errorHandler: $.notify.onError(err => ({
      title: 'style',
      message: err.message
    }))
  })))
  .pipe($.sassLint({ configFile: '.sass-lint.yml'}))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
};
