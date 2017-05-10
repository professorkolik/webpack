const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const paths = require('../paths');

const $ = gulpLoadPlugins();
module.exports = options => () => {
  const isDevelopment = process.env.NODE_ENV.trim() === 'development';
  const viewSrcFiles = paths.src.view.files;
  const viewBuildFolder = isDevelopment ? paths.build.view.folder : paths.prod.view.folder;
  /** task's options */
  const srcFiles = options.src || viewSrcFiles;
  const dest = options.dest || viewBuildFolder;
  const templateOptions = options.templateOptions || {pretty: true};
  /** template assembly task */
  return gulp.src(srcFiles)
    .pipe($.plumber({
      errorHandler: $.notify.onError(err => ({
        title: 'Pug',
        message: err.message
      }))
    }))
    .pipe($.filter(file => {
      return !/_/.test(file.path) && !/^_/.test(file.relative);
      // return !/\/_/.test(file.path) && !/^_/.test(file.relative); For Mac
    }))
    .pipe($.pug(templateOptions))
    .pipe(gulp.dest(dest));
};
