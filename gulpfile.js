var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var compass = require('gulp-compass');
var inject = require('gulp-inject');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');

var webserver = require('gulp-webserver');

// Constants
var SERVER_PORT = 31415;
var htmlPaths = ['./src/app/**/*.html','src/common/**/*.html'];
var sassPaths = ['./src/app/assets/styles/**/*.scss'];
var jsPaths = ['./src/app/**/*.js', 'src/common/**/*.js'];
var imagePaths = ['./src/app/assets/images/**/*.*'];
var fontPaths = ['./src/app/assets/fonts/**/*.*'];
var dataPath = './data/**/*.json';
var outputBaseDirectory = "./build/";

var dataBuildDirectory = outputBaseDirectory+'data/';
var vendorPath = 'src/vendor/**/*.js';

gulp.task('webserver', function() {
  gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port:SERVER_PORT
    }));
});

gulp.task('compass', function () {
    return gulp.src(sassPaths)
        .pipe(compass({
            css: 'build/min/styles',
            sass: 'src/app/assets/styles',
            image: 'src/app/assets/images'
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest(outputBaseDirectory+'min/css'))
});

gulp.task('lint', function() {
    return gulp.src(jsPaths)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(gulp.dest(outputBaseDirectory))
});

gulp.task('images', function() {
    return gulp.src(imagePaths)
        .pipe(imagemin(imagePaths))
        .pipe(gulp.dest(outputBaseDirectory+'assets/images'));
});

gulp.task('compile', ['images', 'compass', 'lint'], function() {
    gulp.src(htmlPaths)
        .pipe(gulp.dest(outputBaseDirectory));

    gulp.src(vendorPath)
        .pipe(gulp.dest(outputBaseDirectory+'vendor/'));

    gulp.src(dataPath)
        .pipe(gulp.dest(dataBuildDirectory));

    gulp.src(fontPaths)
        .pipe(gulp.dest(outputBaseDirectory+'assets/fonts/'));

});

// Serve tasks
gulp.task('reload:html', function () {
    console.log("Reloading html");
    return gulp.src(htmlPaths)
        .pipe(gulp.dest(outputBaseDirectory))
})

gulp.task('reload:json', function () {
    console.log("Reloading json");
    return gulp.src(dataPath)
        .pipe(gulp.dest(dataBuildDirectory))
})

gulp.task('watch', function () {
    gulp.watch(sassPaths, ['compass']);
    gulp.watch(jsPaths, ['lint']);
    gulp.watch(htmlPaths, ['reload:html']);
    gulp.watch(dataPath, ['reload:json']);
});

gulp.task('default', ['webserver','watch']);
