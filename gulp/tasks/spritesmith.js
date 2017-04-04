'use strict';

module.exports = function() {
    $.gulp.task('spritesmith', function() {
        return $.gulp.src('./source/images/sprite/*.*')
            .pipe($.gp.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'css',
                padding: 50
            }))

            .pipe($.gulp.dest('./public/assets/img/'));
    });
};
