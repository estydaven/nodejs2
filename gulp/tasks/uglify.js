'use strict';

module.exports = function() {
  $.gulp.task('uglify', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.uglify('app.min.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};