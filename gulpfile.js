var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename');
	notify = require('gulp-notify');


// Minify JS and store the minifies JS files in the js dist folder.
gulp.task('scripts', function() {
	gulp.src('src/js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message: 'Gulp/Scripts complete!'}));
});

// Minify CSS and store the minified CSS files in the css dist folder.
gulp.task('styles', function() {
	gulp.src('src/css/style.css')
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({message: 'Gulp/Styles complete!'}));
});

// Watches JS & CSS files and
gulp.task('watch', function(){
	gulp.watch('src/js/app.js', ['scripts']);
	gulp.watch('src/css/style.css', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);