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

gulp.task('css', function() {

  return gulp.src('src/**/*.css')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.concat('angular-bootstrap-calendar.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gp.minifyCss())
    .pipe(gp.rename('angular-bootstrap-calendar.min.css'))
    .pipe(gp.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

});

function getTemplates() {

  return gulp
    .src('templates/**/*.html')
    .pipe(gp.minifyHtml({empty: true, conditionals: true, spare: true, quotes: true}))
    .pipe(gp.angularTemplatecache({standalone: false, module: 'mwl.calendar', root: 'templates/'}));

}

function mergeStreams(stream1, stream2) {
  return streamqueue({ objectMode: true }, stream1, stream2);
}

function buildJS(withTemplates) {

  var minFilename = withTemplates ? 'angular-bootstrap-calendar-tpls.min.js' : 'angular-bootstrap-calendar.min.js';
  var unminfilename = withTemplates ? 'angular-bootstrap-calendar-tpls.js' : 'angular-bootstrap-calendar.js';

  var stream = withTemplates ? mergeStreams(
    gulp.src('src/**/*.js'),
    getTemplates()
  ) : gulp.src('src/**/*.js');

  return stream
    .pipe(gp.angularFilesort())
    .pipe(gp.sourcemaps.init())
    .pipe(gp.ngAnnotate())
    .pipe(gp.concat(unminfilename))
    .pipe(gulp.dest('dist/js'))
    .pipe(gp.uglify())
    .pipe(gp.rename(minFilename))
    .pipe(gp.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

gulp.task('js-tpls', function() {
  return buildJS(true);
});

gulp.task('js', ['js-tpls'], function() {
  return buildJS();
});

gulp.task('build', ['js', 'css'], function() {});

gulp.task('default', ['build'], function() {});
