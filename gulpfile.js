var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	watch = require('gulp-watch'),
    gutil = require('gulp-util');
	del = require('del'),
    jshint = require('gulp-jshint'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify');

var paths = {
    scripts: './app/assets/scripts/**/*.*',
    images: './app/assets/images/**/*.*',
    styles: './app/assets/css/**/*.scss',
    bootstrap: './app/bower_components/bootstrap-sass-only/scss/bootstrap.scss'
};

gulp.task('styles', ['del'], function() {
    return gulp
        .src([paths.styles] )
        .pipe(sass({ errLogToConsole: true }) )
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "safari 5", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./app/build/css/'))
        .pipe(notify({ message: 'Styles task complete' }));
        //.pipe(refresh(lrserver));
});

gulp.task('scripts', ['del'], function() {
    return gulp
	    .src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
	    .pipe(uglify()).pipe(uglify().on('error', gutil.log))
	    .pipe(rename({suffix:'.min'}))
	    .pipe(gulp.dest('./app/build/scripts/'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', ['del'], function() {
    return gulp
  	    .src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('.app/build/images/'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('del', function(cb){
    del(['./build/css','./build/scripts', './build/images'], cb )
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['images']);
    console.log("I\'m watching you..");
});


gulp.task('default', ['del'], function(){
    gulp.start('styles', 'scripts', 'images', 'watch');
}); 



