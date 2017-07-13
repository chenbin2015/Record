var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src(['./main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));

});
gulp.task('default',['sass'])