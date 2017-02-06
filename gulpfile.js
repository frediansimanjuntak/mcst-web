var gulp = require('gulp'),
    path = require('path'),
    Builder = require('systemjs-builder'),
    ts = require('gulp-typescript'),
    htmlreplace = require('gulp-html-replace'),
    clean  = require('gulp-clean'),
    tslint = require('gulp-tslint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bs = require("browser-sync"),
    sourcemaps  = require('gulp-sourcemaps');

var bsConfig = require('./bs-config.json');

var tsProject = ts.createProject('tsconfig.json');

var appDev = 'app'; // where your ts files are, whatever the folder structure in this folder, it will be recreated in the below 'dist/app' folder
var appProd = 'dist/app';
var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';

function startBrowsersync(config) {
    bsIns = bs.create();
    bsIns.init(config);
    bsIns.reload();
}

/** first transpile your ts files */
gulp.task('compile:ts', () => {
    return gulp.src(appDev + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(gulp.dest(appProd));
});


/** then bundle */
var bundleApp = function() {
  var builder = new Builder('', 'systemjs.config.js');
  return builder
      .buildStatic(appProd + '/main.js', appProd + '/main.bundle.js', {
        minify: true,
        sourceMaps: true,
        mangle: false,
        rollup: true
      })
      .then(function() {
          console.log('Build complete');
      })
      .catch(function(err) {
          console.log('Build error');
          console.log(err);
      });
};

gulp.task('bundle', gulp.series(bundleApp), function () {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'app': 'main.bundle.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:assets', function() {
     return gulp.src(['./assets/**/*'], {base:"."})
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy:templates', function() {
     return gulp.src(['./app/templates/**/*'], {base:"./app"})
        .pipe(gulp.dest('./dist/app'));
});

// Bundle dependencies into vendors file
gulp.task('bundle:libs', function () {
  return gulp.src([
    'assets/js/jquery.min.js',
    'assets/js/bootstrap.min.js',
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'systemjs.config.js'
  ])
  .pipe(concat('vendors.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('bundle:fake', function () {
  return gulp.src(appProd + '/main.js')
  .pipe(concat('main.bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/app'));
});

var cleanDist = function () {
  return gulp.src(['./dist/'], {read: false})
  .pipe(clean());
};

var cleanTs = function () {
  return gulp.src(['./app/**/*.js', './app/**/*.js.map'], {read: false})
  .pipe(clean());
};

gulp.task('clean', gulp.series([cleanTs, cleanDist]), function() {
  return del(['dist']);
});

var watch = function() {
  gulp.watch("*.html").on('change', bsIns.reload);
};

var browserSync = function() {
  startBrowsersync(bsConfig);
};

gulp.task('serve', gulp.series([browserSync, watch]));

gulp.task('watch', function (){
  gulp.watch([appDev + "/**/*.ts"], gulp.series(['compile:ts'])).on('change', function(e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
});

gulp.task('build:dev', gulp.series(['clean', 'compile:ts', 'copy:templates', 'copy:assets', 'bundle:fake', 'bundle:libs']));

/** this runs the above in order. uses gulp4 */
gulp.task('build', gulp.series(['clean', 'compile:ts', 'copy:templates', 'copy:assets', 'bundle', 'bundle:libs']));

gulp.task('pre-build', gulp.series(['copy:templates', 'copy:assets']));
