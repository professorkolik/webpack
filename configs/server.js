const gulp = require('gulp');
const browserSync = require('browser-sync');
const paths = require('./paths');

const server = browserSync.create();
module.exports = options => () => {
  const buildFolder = paths.build.folder;
  const viewSrcFiles = paths.src.view.files;
  const styleSrcFiles = paths.src.style.files;
  const jsSrcFiles = paths.src.js.files;
  server.init({
    notify: options.notify,
    server: {
      baseDir: buildFolder
    },
    startPath: '/ui.html'
  });
  gulp.watch(viewSrcFiles, gulp.series('assembly-view', (done) => {
    server.reload();
    done();
  }));
  gulp.watch(styleSrcFiles, gulp.series('lint-style', 'assembly-style', (done) => {
    server.reload();
    done();
  }));
  gulp.watch(jsSrcFiles, gulp.series('assembly-js', (done) => {
    server.reload();
    done();
  }));
};
