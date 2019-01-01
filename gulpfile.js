var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');

//-----------Server config-------------//
gulp.task('reload-browser', function() {
    browserSync.init({
        server: {
            baseDir: "build",
            port: 9000
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload)

});

//-----------Compile pug files-------------//
gulp.task('compile-pug', function buildHTML() {
    return gulp.src('source/templates/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

//-----------Compile sass files-------------//
gulp.task('compile-sass', function() {
    return gulp.src('source/templates/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.build/css'));
});


//------------------------//