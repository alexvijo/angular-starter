var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	watch = require('gulp-watch'),
	del = require('del');

var paths = {
    scripts: './app/scripts/**/*.*',
    images: './app/assets/images/**/*',
    styles: './app/css/**/*.*'
};


gulp.task('del', function(){
	del(['assets'], function(err){
		console.log('deleted assets!');
	})
});

gulp.task('minify-css', ['del'],  function() {
    return gulp
  	    .src(paths.styles)
        .pipe(minifyCSS( {keepBreaks:true} ))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./app/css/'))
});

gulp.task('scripts', ['del'], function() {
    return gulp
	    .src(paths.scripts)
	    .pipe(uglify())
	    .pipe(rename({suffix:'.min'}))
	    .pipe(gulp.dest('./app/scripts/'))
});

gulp.task('images', ['del'], function() {
    return gulp
  	    .src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('assets/images'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['minify-css']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['del', 'minify-css','scripts', 'watch']);



