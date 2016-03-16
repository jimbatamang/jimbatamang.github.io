/*
 * Author: Jimba Tamang (ggg.com.au)
 * Version: 0.0.2
 * Create on March 06, 2016
 * ------------------------------------------------------------------------
 * ************* Gulp *************
 * ======================================================================== */

// usage: [ENV_STR = "production/development"] gulp

var env       = process.env.NODE_ENV || 'development';

// Load plugins
var gulp          = require('gulp'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    plumber       = require('gulp-plumber'),
    clean         = require('gulp-clean'),
    packageInfo   = require('./package.json'),
    ifElse        = require('gulp-if-else');


// Define assets
var paths = {

      src: {
        sass:       'assets/src/sass/style.scss',

        css:        ['assets/src/css/*.css',
                     'assets/_temp/css/*.css',
                    ],

        custom_js:  ['assets/src/js/scripts.js'],

        js:         ['assets/src/js/vendor/modernizr.js',
                     'assets/src/components/jquery/dist/jquery.js',
                     'assets/src/components/flexslider/jquery.flexslider.js', // Fancybox JS
                     'assets/_temp/js/*.js']
      },

      dest: {
        sass:    'assets/src/css',
        css:     'assets/dist', 
        js:      'assets/dist'
      },

      temp: {
        css: 'assets/_temp/css',
        js: 'assets/_temp/js', 
      }
};


// SASS
gulp.task('sass', ['clean-css'], function() {
  return sass(paths.src.sass, {
      style: 'expanded',
        lineNumbers: true
    })
    .on('error', sass.logError)
    .pipe(autoprefixer('last 4 version', {map: false}))
   // .pipe(mmq({log: true}))
    .pipe(gulp.dest(paths.temp.css))
});

//CSS - Let's combine all css and minify them
gulp.task('css', ['sass'], function() {
  return gulp.src(paths.src.css)
        .pipe(plumber())
        .pipe(concat('styles.css'))
        .pipe( ifElse(env === 'production', minifycss))
        .pipe(gulp.dest(paths.dest.css))
});

// Scripts
gulp.task('scripts', ['clean-js'], function() {
  return gulp.src(paths.src.custom_js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.temp.js))
});

gulp.task('concact_scripts', ['scripts'], function() {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe( ifElse(env === 'production', uglify))
    .pipe(gulp.dest(paths.dest.js))
});

gulp.task('clean-css', function(){
  return gulp.src(paths.temp.css)
        .pipe(clean());
});

gulp.task('clean-js', function(){
  return gulp.src(paths.temp.js)
        .pipe(clean());
});


// Watch Dev
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/src/sass/**/*.scss', ['sass', 'css']);

  // Watch .js files
  gulp.watch(paths.src.custom_js, ['scripts', 'concact_scripts']);


});



/* TASKS
========================================================================== */

// Listing Default Tasks
var defaultTasks = [ 'sass', 'css', 'scripts', 'concact_scripts', 'watch'];

// Run Default Task task
gulp.task('default', defaultTasks);
