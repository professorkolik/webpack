const gulp = require('gulp');
const objAssign = require('lodash.assign');
const paths = require('./configs/paths');
/**
 * @return gulp task
 * @param taskName {string} name of task
 * @param path {string} path to file with code of task
 * @param options {object=} object with custom options of task
 */
function lazyRequireTask(taskName, path, options = {}) {
  objAssign(options, { taskName });
  gulp.task(taskName, (callback) => {
    const task = require(path).call(this, options);
    return task(callback);
  });
}
/** common tasks */
lazyRequireTask('lint-style', './configs/style/style-lint.js');
lazyRequireTask('assembly-style', './configs/style/style-assembly.js');
lazyRequireTask('assembly-js', './configs/js/js-assembly.js', {
  src: [`${paths.src.js.folder}index.js`]
});
lazyRequireTask('assembly-view', './configs/view/view-assembly.js');

/** Tasks for development */
lazyRequireTask('set-watch', './configs/set-watch.js');
lazyRequireTask('server', './configs/server', {
  src: paths.build.folder,
  notify: false,
  startPage: 'ui.html'
});

/** Modified dev */
gulp.task('dev',
  gulp.series('set-watch',
    gulp.parallel('assembly-js', 'assembly-view',
      gulp.series('lint-style', 'assembly-style')
    )
  )
);

/** Tasks for production */
lazyRequireTask('clean-prod', './configs/clean.js', {
  src: paths.prod.folder
});

gulp.task('prod', function (cb) {
  let wrapperCb = function(feedback){
    if(feedback){
      process.exit(1);
    }
    cb(feedback);
  };
    gulp.series('clean-prod',
      gulp.parallel('assembly-js', 'assembly-view',
        gulp.series('lint-style', 'assembly-style')
      )
    )(wrapperCb);
  }
);

/** Task by default */
gulp.task('default', gulp.series('dev', 'server'));
