// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');

// Locations
var jsAppLocations = ['app/app.module.js', 'app/app.routes.js', 'app/components/**/*.js'];
var jsLibsLocations = ['node_modules/angular/angular.min.js', 'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', 'node_modules/angular-sanitize/angular-sanitize.min.js'];
var sassAppLocations = ['app/assets/sass/*.sass'];
var cssLibsLocations = ['node_modules/bootstrap/dist/css/bootstrap.min.css'];

gulp.task('test', function () {
	return gulp.src('test/test.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(jsAppLocations)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function() {
	
	gulp.src(cssLibsLocations)
        .pipe(concat('todo-libs.css'))
		.pipe(gulp.dest('app/assets/css'));
	
    return gulp.src(sassAppLocations)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('app/assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	
	gulp.src(jsLibsLocations)
        .pipe(concat('todo-libs.js'))
		.pipe(gulp.dest('app/assets/js'));
	
    return gulp.src(jsAppLocations)
        .pipe(concat('todo-app.js'))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(rename('todo-app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(jsAppLocations, ['lint', 'scripts']);
    gulp.watch(sassAppLocations, ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
