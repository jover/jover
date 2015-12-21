'use strict';

var cp     = require('child_process');
var gulp   = require('gulp');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass   = require('gulp-sass');
var uglify = require('gulp-uglify');

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
 * SASS.
 */
gulp.task('sass', function () {
  return gulp.src('_sass/style.scss')
    .pipe(sass({
      includePaths: ['sass'],
      onError: sass.logError
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename('./style.compiled.scss'))
    .pipe(gulp.dest('./_sass'));
});

/**
 * Compress JS.
 */
gulp.task('compress', function() {
  return gulp.src([
    './_assets/vendor/bootstrap/js/util.js',
    './_assets/vendor/bootstrap/js/collapse.js',
    './_assets/js/scripts.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
});

/**
 * Place the IcoMoon/FontAwesome font files in the right place.
 */
gulp.task('fonts', function() {
  return gulp.src('./_assets/vendor/icomoon/fonts/**/*')
    .pipe(gulp.dest('./fonts'));
});

/**
 * Watch files.
 */
gulp.task('watch', function () {
  gulp.watch([
    '_config.yml',
    '_assets/**/*',
    '_includes/*.html',
    '_layouts/*.html',
    '_posts/*',
    '**/*.html',
    '_sass/**/*.scss',
    '!_sass/style.compiled.scss',
    'images/*'
  ], ['sass', 'compress', 'fonts', 'jekyll-build']);
});

gulp.task('default', ['sass', 'compress', 'fonts', 'jekyll-build', 'watch']);
