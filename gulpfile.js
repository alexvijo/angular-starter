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
	del = require('del');

var paths = {
    scripts: './app/assets/scripts/**/*.*',
    images: './app/assets/images/**/*.*',
    styles: './app/assets/css/**/*.*'
};

gulp.task('styles', ['del'], function() {
    return gulp
        .src([ paths.styles, './app/bower_components/bootstrap-sass-only/scss/bootstrap.scss'] )
        .pipe(sass({onError: function(e) { console.log(e); } }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./app/build/css/'))
        //.pipe(refresh(lrserver));
});

gulp.task('del', function(){
    del(['build'], function(err){
        console.log('deleted build folder!');
    });
});

gulp.task('scripts', ['del'], function() {
    return gulp
	    .src(paths.scripts)
	    .pipe(uglify()).pipe(uglify().on('error', gutil.log))
	    .pipe(rename({suffix:'.min'}))
	    .pipe(gulp.dest('./app/build/scripts/'))
});

gulp.task('images', ['del'], function() {
    return gulp
  	    .src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('.app/build/images/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['images']);
    console.log('I am watching you...');
});

gulp.task('default', ['styles','scripts', 'images', 'watch']);



