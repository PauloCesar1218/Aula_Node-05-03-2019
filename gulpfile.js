const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', function(){
    browserSync.init({
        server: './app'
    });

    gulp.watch("./app/*.html").on('change', () => {
        browserSync.reload();
    });
    gulp.watch('./app/JS/*.js').on('change', () => {
        browserSync.reload();
    });
    gulp.watch('./app/CSS/*.css').on('change', () => {
        browserSync.reload();
    });
});

gulp.task('default', gulp.series('serve'));