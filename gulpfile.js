var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var open = require("open");

gulp.task('watch', ['server'], function() {
  gp.livereload.listen();
  gulp.watch(['./index.html', './docs/**', './src/**']).on('change', gp.livereload.changed);
});

gulp.task('server', function() {
  gp.connect.server({
    root: ['./'],
    port: 8000,
    livereload: false
  });

  open('http://localhost:8000');
});

gulp.task('css-unmin', function() {

  return gulp.src('src/**/*.css')
    .pipe(gp.concat('angular-bootstrap-calendar.css'))
    .pipe(gulp.dest('dist/css'));

});

gulp.task('css-min', function() {

  return gulp.src('src/**/*.css')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.concat('angular-bootstrap-calendar.min.css'))
    .pipe(gp.minifyCss())
    .pipe(gp.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

});

gulp.task('css', ['css-min', 'css-unmin'], function() {});

var getTemplates = function() {

  return gulp
    .src('templates/**/*.html')
    .pipe(gp.minifyHtml({empty: true, conditionals: true, spare: true, quotes: true}))
    .pipe(gp.angularTemplatecache({standalone: false, module: 'mwl.calendar', root: 'templates/'}));

};

var mergeStreams = function(stream1, stream2) {
  return streamqueue({ objectMode: true }, stream1, stream2);
};

var getJsBase = function() {

  return mergeStreams(
    gulp.src('src/**/*.js'),
    getTemplates()
  ).pipe(gp.angularFilesort())
   .pipe(gp.ngAnnotate());
};

gulp.task('js-unmin', function() {

  return getJsBase()
    .pipe(gp.concat('angular-bootstrap-calendar.js'))
    .pipe(gulp.dest('dist/js'));

});

gulp.task('js-min', function() {

  return getJsBase()
    .pipe(gp.sourcemaps.init())
    .pipe(gp.concat('angular-bootstrap-calendar.min.js'))
    .pipe(gp.uglify())
    .pipe(gp.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));

});

gulp.task('js', ['js-min', 'js-unmin'], function() {});

gulp.task('build', ['js', 'css'], function() {});

gulp.task('default', ['build'], function() {});
