var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var series = require('stream-series');
var webpack = require('webpack-stream');


gulp.task('less', function() {
  return gulp.src('src/less/calendar.less')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.rename('calendar.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('webpack', function() {
  return gulp.src('index.js')
    .pipe(webpack({
      output: {
        filename: 'calendar.js'
      },
      externals: {
        angular: 'angular',
        moment: 'moment',
        'interact.js': 'interact'
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('build'));
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

function buildJS(withTemplates) {

  var minFilename = withTemplates ? 'angular-bootstrap-calendar-tpls.min.js' : 'angular-bootstrap-calendar.min.js';
  var unminfilename = withTemplates ? 'angular-bootstrap-calendar-tpls.js' : 'angular-bootstrap-calendar.js';

  var stream = withTemplates ? series(
    gulp.src('build/calendar.js'),
    getTemplates()
  ) : gulp.src('build/calendar.js');

  return stream
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.ngAnnotate())
    .pipe($.concat(unminfilename))
    .pipe($.header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/js'))
    .pipe($.uglify())
    .pipe($.rename(minFilename))
    .pipe($.header(banner, { pkg : pkg } ))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

gulp.task('js-tpls', ['webpack'], function() {
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

gulp.task('bump:patch', function() { return release('patch'); });
gulp.task('bump:minor', function() { return release('minor'); });
gulp.task('bump:major', function() { return release('major'); });

gulp.task('default', ['watch'], function() {});
