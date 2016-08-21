var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
livereload = require('gulp-livereload');


gulp.task('connect', function(){
    return connect.server({
        root:'app',
        livereload:true
    });
});


gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(prefix({ browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(minifyCSS("bundle.css"))
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('app/css/'))
        .pipe(connect.reload())
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(connect.reload())
});


gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(connect.reload())
});


gulp.task('watch', function(){
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'css', 'html', 'js', 'watch']);