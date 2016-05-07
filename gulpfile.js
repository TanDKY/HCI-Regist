var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync')
	.create();

gulp.task('scripts', function () {
	return gulp.src(['public/js/application.js', 'public/js/controllers/*.js', 'public/js/factories/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('public/js/'));
});

gulp.task('styles', function () {
	return gulp.src(['public/css/assets/*.css'])
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('public/css/'));
});

gulp.task('libaryScripts', function () {
	return gulp.src(['./bower_components/angular/angular.js',
						'./bower_components/jquery/dist/jquery.min.js',
						'./bower_components/jquery-ui/jquery-ui.min.js',
						'./bower_components/jQuery.dotdotdot/src/js/jquery.dotdotdot.min.js',
  						'./bower_components/blueimp-file-upload/js/jquery.fileupload.js',
						'./bower_components/cloudinary_js/js/jquery.cloudinary.js',
						'./bower_components/lodash/lodash.min.js',
						'./bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
						'./bower_components/angular-google-maps/dist/angular-google-maps.min.js',
						'./bower_components/bootstrap/dist/js/bootstrap.min.js',
						'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
						'./bower_components/ngstorage/ngStorage.min.js',
						'./bower_components/angoolar-cookies/js/vendor/002_angular-cookies.tail.js'
					])
		.pipe(concat('libary.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('default', ['scripts', 'styles', 'libaryScripts'], function () {
	gulp.watch(['public/js/application.js', 'public/js/controllers/*.js', 'public/js/factories/*.js'], ['scripts']);
	gulp.watch(['public/css/assets/*.css'], ['styles']);
	browserSync.init({
		port: 8000,
		server: {
			baseDir: "./public"
		}
	});
});

//gulp.task('heroku:prod', ['scripts', 'styles', 'libaryScripts']);
