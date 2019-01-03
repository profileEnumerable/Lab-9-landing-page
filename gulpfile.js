var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var rimraf = require('rimraf');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

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
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError)) //{ outputStyle: 'compressed' } don't forget to return back to release
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});


//------------Create sprite------------//
gulp.task('sprite', function() {
    var spriteData = gulp.src('source/images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss'
    }));
    return spriteData.pipe(gulp.dest('source/global'));
});

//------------For delete img,fonts------------//
gulp.task('clean', function del(cd) {
    return rimraf('build', cd);
});

//------------Copy fonts------------//
gulp.task('copy:fonts', function() {
    return gulp.src('.source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

//------------Copy images------------//
gulp.task('copy:images', function() {
    return gulp.src('.source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

//------------Copy All------------//
gulp.task('copy-all', gulp.parallel('copy:fonts', 'copy:images'));


//------------Watchers ------------//
gulp.task('watch', function() {
    gulp.watch('source/styles/**/*.scss', gulp.series('compile-sass'));
    gulp.watch('source/templates/**/*.pug', gulp.series('compile-pug'));
})

//------------ Autoprefixer ------------//
gulp.task('autoprefixer', function() {
    return gulp.src('build/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

//------------ Default ------------//

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('compile-pug', 'compile-sass', 'sprite', 'copy-all'),
    gulp.parallel('autoprefixer', 'watch', 'reload-browser')
));