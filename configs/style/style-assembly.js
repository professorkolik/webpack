const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPartialImport = require('postcss-partial-import');
const classPrfx = require('postcss-class-prefix');
const paths = require('../paths');
const path = require('path');

const $ = gulpLoadPlugins();
module.exports = options => () => {
  const isDevelopment = process.env.NODE_ENV.trim() === 'development';
  const styleSrcFiles = paths.src.style.files;
  const styleDestFolder = isDevelopment ? paths.build.style.folder : paths.prod.style.folder;
  /** task options */
  const srcFiles = options.src || styleSrcFiles;
  const dest = options.dest || styleDestFolder;
  const processors = options.processors || [
    autoprefixer({browsers: ['last 1 version']}),
    classPrfx('ce-'),
    postcssPartialImport()
  ];

  if (!isDevelopment) {
    processors.push(cssnano({
      safe: true,
      sourcemap: false
    }));
  }
  /** template assembly task */
  return gulp.src(srcFiles)
    .pipe($.plumber({
      errorHandler: $.notify.onError(err => ({
        title: 'style',
        message: err.message
      }))
    }))
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
//    .pipe($.if(global.isWatching, $.cached('style')))
//     .pipe($.sassInheritance({dir: paths.src.folder, debug: true})) May be required for Mac
    .pipe($.filter(file => {
      return !/\/_/.test(file.path) || !/^_/.test(file.relative);
    }))
    .pipe($.sass({
      includePaths: ['./node_modules/'],
      importer: function (url, prev, done) {
        if (url[0] === '~') {
          url = path.resolve('node_modules', url.substr(1));
        }

        return { file: url };
      }
    }))
    .pipe($.postcss(processors))
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe(gulp.dest(dest));
};
