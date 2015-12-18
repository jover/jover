"use strict";

var gulp   = require('gulp');
//var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cp     = require('child_process');

/**
 * Bundle install.
 */
gulp.task('bundle-install', function (done) {
  return cp.spawn('bundle', ['install'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Jekyll build.
 */
gulp.task('jekyll-build', ['bundle-install'], function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
 * Compress JS.
 */
gulp.task('compress', function() {
  return gulp.src([
    './_assets/bootstrap/js/util.js',
    './_assets/bootstrap/js/collapse.js',
    './js/scripts.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'))
});

/**
 * Place the IcoMoon/FontAwesome font files in the right place.
 */
gulp.task('fonts', function() {
  return gulp.src('./_assets/icomoon/fonts/**/*')
    .pipe(gulp.dest('./fonts'));
});

/**
 * Watch files.
 */
gulp.task('watch', function () {
  gulp.watch(['_config.yml', '_includes/*.html', '_layouts/*.html', '_posts/*', '**/*.html', '_sass/**/*.sass', 'js/**/*', 'images/*'], ['jekyll-build']);
});

gulp.task('default', ['compress', 'fonts', 'watch']);
