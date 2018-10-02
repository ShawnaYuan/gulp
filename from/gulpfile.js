var gulp = require('gulp'),
gutil = require('gulp-util'),
rename = require('gulp-rename'),
server = require('gulp-server-livereload'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
precss = require('precss'),
lost = require('lost'),

source = 'process/css/',
dest = 'builds/postcss/';

gulp.task('html', function() {
	gulp.src(dest + '*.html');
});

gulp.task('css', function() {
	gulp.src(source + 'style.pcss')
	.pipe(postcss([
		precss(),
		lost(),
		autoprefixer()
	]))
	.on('error',gutil.log)
	.pipe(rename('style.css'))
	.pipe(gulp.dest(dest + 'css'))
});

gulp.task('watch', function() {
	gulp.watch(source + '**/*.pcss', ['css']);
	gulp.watch(dest + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
	gulp.src(dest)
	.pipe(server({
		livereload: true,
		open: true
	}));
});

gulp.task('default', ['html', 'css', 'webserver', 'watch']);