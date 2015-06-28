var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');
var runSequence = require('run-sequence');
var bowerFiles = require('main-bower-files');
var series = require('stream-series');
var webpack = require('webpack-stream');

gulp.task('watch', ['server'], function() {
  $.livereload.listen();
  gulp.start('test:watch');
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/**/*.js', ['eslint', 'webpack']);
  gulp.watch('src/templates/**/*.html', ['htmlhint']);
  gulp.watch('css/*.css').on('change', $.livereload.changed);
  gulp.watch([
    './index.html',
    './docs/scripts/*.js',
    './docs/styles/*.css',
    './build/**/*.js',
    './src/templates/**']
  ).on('change', $.livereload.changed);
});

gulp.task('server', ['less', 'webpack'], function() {
  $.connect.server({
    root: ['./'],
    port: 8000,
    livereload: false
  });

  open('http://localhost:8000');
});

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

function eslint(failOnError) {
  var stream = gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());

  if (failOnError) {
    return stream.pipe($.eslint.failOnError());
  } else {
    return stream;
  }
}

gulp.task('eslint', function() {
  return eslint();
});

gulp.task('ci:eslint', function() {
  return eslint(true);
});

function htmlhint(failOnError) {
  var stream = gulp
    .src('src/templates/*.html')
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter());

  if (failOnError) {
    return stream.pipe($.htmlhint.failReporter());
  } else {
    return stream;
  }
}

gulp.task('htmlhint', function() {
  return htmlhint();
});

gulp.task('ci:htmlhint', function() {
  return htmlhint(true);
});

gulp.task('lint', ['eslint', 'htmlhint']);

gulp.task('ci:lint', ['ci:eslint', 'ci:htmlhint']);

function runTests(action, onDistCode) {
  var vendorJs = gulp.src(bowerFiles({includeDev: true})).pipe($.filter('*.js'));
  if (onDistCode) {
    var appJs = gulp.src('dist/js/angular-bootstrap-calendar-tpls.min.js');
  } else {
    var appJs = gulp.src('build/calendar.js');
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

gulp.task('test:src', ['webpack'], function() {
  return runTests('run').on('error', function(err) {
    throw err;
  });
});

gulp.task('test:dist', ['js'], function() {
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
