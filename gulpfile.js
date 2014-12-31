var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	watch = require('gulp-watch'),
    gutil = require('gulp-util');
	del = require('del');

var paths = {
    scripts: './app/assets/scripts/**/*.*',
    images: './app/assets/images/**/*.*',
    styles: './app/assets/css/**/*.*'
};


gulp.task('del', function(){
    del(['build'], function(err){
        console.log('deleted build folder!');
    });
});

gulp.task('minify-css', ['del'],  function() {
    return gulp
  	    .src(paths.styles)
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./app/build/css/'))
});

gulp.task('scripts', ['del'], function() {
    return gulp
	    .src(paths.scripts)
	    //.pipe(uglify()).pipe(uglify().on('error', gutil.log))
	    .pipe(rename({suffix:'.min'}))
	    .pipe(gulp.dest('./app/build/scripts/'))
});

gulp.task('images', ['del'], function() {
    return gulp
  	    .src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('.app/build/images/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['minify-css']);
    gulp.watch(paths.images, ['images']);
    console.log('I am watching you...');
});

gulp.task('default', ['minify-css','scripts', 'images', 'watch']);