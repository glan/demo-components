'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['browserify', 'jshint', 'less']);

// JSHint task
gulp.task('jshint', function () {
    gulp.src(['gulpfile.js', './src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Browserify (with sourcemaps) task
gulp.task('browserify', function () {
    gulp.src('./src/js/main.js', {
            read: false
        })
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest('./js/'));
});

// LESS (with sourcemaps) task
gulp.task('less', function () {
    var a = gulp.src('./src/less/dropdown.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});
