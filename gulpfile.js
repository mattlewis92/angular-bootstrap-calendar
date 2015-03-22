var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var open = require('open');

gulp.task('watch', ['server'], function() {
  $.livereload.listen();
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/**/*.js', ['lint']);
  gulp.watch('css/*.css').on('change', $.livereload.changed);
  gulp.watch([
    './index.html',
    './docs/scripts/*.js',
    './docs/styles/*.css',
    './src/**/*.js',
    './templates/**']
  ).on('change', $.livereload.changed);
});

gulp.task('server', function() {
  $.connect.server({
    root: ['./'],
    port: 8000,
    livereload: false
  });

  open('http://localhost:8000');
});

gulp.task('less', function() {
  return gulp.src('src/less/calendar.less')
    .pipe($.less())
    .pipe($.rename('calendar.css'))
    .pipe(gulp.dest('css'))
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('css', function() {

  return gulp.src('src/less/calendar.less')
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.rename('angular-bootstrap-calendar.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.minifyCss())
    .pipe($.rename('angular-bootstrap-calendar.min.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

});

function getTemplates() {

  return gulp
    .src('templates/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache({
      standalone: false,
      module: 'mwl.calendar',
      root: 'templates/'
    }));

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
    .pipe($.sort())
    .pipe($.angularFilesort())
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.concat(unminfilename))
    .pipe(gulp.dest('dist/js'))
    .pipe($.uglify())
    .pipe($.rename(minFilename))
    .pipe($.sourcemaps.write('.'))
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
