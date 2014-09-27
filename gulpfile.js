var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('watch', ['server'], function() {
  livereload.listen();
  gulp.watch(['./index.html', './docs/**', './src/**']).on('change', livereload.changed);
});

gulp.task('server', function() {
  connect.server({
    root: ['./'],
    port: 4242,
    livereload: false
  });
});

