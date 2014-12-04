var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var open = require('open');

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

function getTemplates() {

  return gulp
    .src('templates/**/*.html')
    .pipe(gp.minifyHtml({empty: true, conditionals: true, spare: true, quotes: true}))
    .pipe(gp.angularTemplatecache({standalone: false, module: 'mwl.calendar', root: 'templates/'}));

};

function mergeStreams(stream1, stream2) {
  return streamqueue({ objectMode: true }, stream1, stream2);
};

function getJsBase(withTemplates) {

  var stream = withTemplates ? mergeStreams(
    gulp.src('src/**/*.js'),
    getTemplates()
  ) : gulp.src('src/**/*.js');

  return stream
    .pipe(gp.angularFilesort())
    .pipe(gp.ngAnnotate());
};

function jsUnmin(withTemplates) {
  var filename = withTemplates ? 'angular-bootstrap-calendar-tpls.js' : 'angular-bootstrap-calendar.js';

  return getJsBase(withTemplates)
    .pipe(gp.concat(filename))
    .pipe(gulp.dest('dist/js'));
}

function jsMin(withTemplates) {

  var filename = withTemplates ? 'angular-bootstrap-calendar-tpls.min.js' : 'angular-bootstrap-calendar.min.js';

  return getJsBase(withTemplates)
    .pipe(gp.sourcemaps.init())
    .pipe(gp.concat(filename))
    .pipe(gp.uglify())
    .pipe(gp.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

gulp.task('js-unmin', function() {
  return jsUnmin();
});

gulp.task('js-unmin-tpls', function() {
  return jsUnmin(true);
});

gulp.task('js-min', function() {
  return jsMin();
});

gulp.task('js-min-tpls', function() {
  return jsMin(true);
});

gulp.task('js', ['js-min-tpls', 'js-min', 'js-unmin-tpls', 'js-unmin'], function() {});

gulp.task('build', ['js', 'css'], function() {});

gulp.task('default', ['build'], function() {});
