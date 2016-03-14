var isEnv = process.env.NODE_ENV === 'production'; // prod / dev

// Load plugins
var gulp          = require('gulp'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    cache         = require('gulp-cache'),
    cmq           = require('gulp-combine-media-queries'),
    plumber       = require('gulp-plumber'),
    sourcemaps    = require('gulp-sourcemaps'),
    ifElse        = require('gulp-if-else');


// Default Tasks
var defaultTasks = [  'sass',
                      'css',
                      'scripts',
                      'watch'
                    ]

var paths       = {
                    src: {
                      sass:    'assets/src/sass/',
                      scss:    'assets/src/sass/**/*.scss',
                      css:     ['assets/src/css/flexslider.css',
                                'assets/src/css/style.css'],
                      js:      ['assets/src/js/vendor/modernizr.js',
                                'assets/src/js/vendor/jquery-2.2.1.min.js',
                                'assets/src/js/vendor/jquery-migrate-1.2.1.min.js',
                                'assets/src/js/vendor/jquery.flexslider-min.js',
                                'assets/src/js/scripts.js']
                    },
                    dest: {
                      sass:    'assets/src/css',
                      css:     'assets/build', 
                      js:      'assets/build'
                    }
                  };


// SASS
gulp.task('sass', function() {
  return sass('assets/src/sass/style.scss', {
              style: 'expanded',
              lineNumbers: true,
              sourcemap: true
    })
    .on('error', sass.logError)

    .pipe(autoprefixer('last 4 version', {map: true}))

    .pipe(sourcemaps.write())

    // For file sourcemaps
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))

    // .pipe(cmq({log: true}))

    .pipe(gulp.dest(paths.dest.sass))

});

//CSS - Let's combine all css and minify them
gulp.task('css', ['sass'], function() {
  return gulp.src(paths.src.css)
        .pipe(plumber())
        .pipe(concat('style.css'))
        // .pipe(ifElse(isEnv, minifycss))
        .pipe(gulp.dest(paths.dest.css))
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    // .pipe(ifElse(isEnv, uglify))
    .pipe(gulp.dest(paths.dest.js))
});


// Watch Dev
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/src/sass/**/*.scss', ['css', 'sass']);

  // Watch .css files
  gulp.watch('assets/src/css/*.css', ['css']);

  // Watch .js files
  gulp.watch('assets/src/js/**/*.js', ['scripts']);


});






/* TASKS
========================================================================== */

// Default task
gulp.task('default', defaultTasks);
