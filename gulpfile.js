var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var open = require('open');
var runSequence = require('run-sequence');
var bowerFiles = require('main-bower-files');
var series = require('stream-series');

gulp.task('watch', ['server'], function() {
  $.livereload.listen();
  gulp.start('test:watch');
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/**/*.js', ['lint']);
  gulp.watch('css/*.css').on('change', $.livereload.changed);
  gulp.watch([
    './index.html',
    './docs/scripts/*.js',
    './docs/styles/*.css',
    './src/**/*.js',
    './src/templates/**']
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

var pkg = require('./bower.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('css', function() {

  return gulp.src('src/less/calendar.less')
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.header(banner, { pkg : pkg } ))
    .pipe($.rename('angular-bootstrap-calendar.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.minifyCss())
    .pipe($.rename('angular-bootstrap-calendar.min.css'))
    .pipe($.header(banner, { pkg : pkg } ))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

});

function getTemplates() {

  return gulp
    .src('src/templates/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache({
      standalone: false,
      module: 'mwl.calendar',
      root: 'src/templates/'
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
    .pipe($.wrapJs('(function(window, angular) {\n%= body %\n }) (window, angular);'))
    .pipe($.header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/js'))
    .pipe($.uglify())
    .pipe($.rename(minFilename))
    .pipe($.header(banner, { pkg : pkg } ))
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

function release(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({type: importance}))
    .pipe(gulp.dest('./'));
}

gulp.task('release:patch', function() { return release('patch'); });
gulp.task('release:minor', function() { return release('minor'); });
gulp.task('release:major', function() { return release('major'); });

gulp.task('default', ['watch'], function() {});

function lint(failOnError) {
  var stream = gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());

  if (failOnError) {
    return stream.pipe($.eslint.failOnError());
  } else {
    return stream;
  }
}

gulp.task('lint', function() {
  return lint();
});

gulp.task('ci:lint', function() {
  return lint(true);
});

function runTests(action, onDistCode) {
  var vendorJs = gulp.src(bowerFiles({includeDev: true})).pipe($.filter('*.js'));
  if (onDistCode) {
    var appJs = gulp.src('dist/js/angular-bootstrap-calendar-tpls.min.js');
  } else {
    var appJs = gulp.src('src/**/*.js').pipe($.sort()).pipe($.angularFilesort());
  }
  var templates = gulp.src('src/templates/*.html');
  var karmaSetup = gulp.src('test/karma.setup.js');
  var test = gulp.src('test/unit/**/*.js');

  return series(vendorJs, appJs, templates, karmaSetup, test)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: action
    }));
}

gulp.task('test:src', function() {
  return runTests('run').on('error', function(err) {
    throw err;
  });
});

gulp.task('test:dist', function() {
  return runTests('run', true).on('error', function(err) {
    throw err;
  });
});

gulp.task('test:watch', function() {
  return runTests('watch');
});

gulp.task('ci', function(done) {
  runSequence('ci:lint', 'build', 'test:dist', done);
});
