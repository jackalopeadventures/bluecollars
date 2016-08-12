var gulp = require('gulp'),
gutil = require('gulp-util'),
bower = require('bower'),
minifyCss = require('gulp-minify-css'),
rename = require('gulp-rename'),
sh = require('shelljs'),
concat = require('gulp-concat'),
embedTemplates = require('gulp-angular-embed-templates'),
series = require('stream-series'),
merge = require('merge-stream'),
watch = require('gulp-watch'),
runSequence = require('run-sequence').use(gulp),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
order = require('gulp-order'),
jsonfile = require('jsonfile');


var project = jsonfile.readFileSync('./package.json');

var paths = {
  sass: ['./src/scss/**/*.scss'],
  appjs: ['./src/app/*.js','./src/app/js/*.js','./src/app/js/**/*.js'],
  templates: ['./src/app/js/**/*.html'],
  img: ['./src/img/**/*.*'],
  lib: ['./src/lib/**/*.*'],
  index: ['./src/index.html']
};



gulp.task('default', function() {
  runSequence('js', 'sass', 'move-lib', 'move-img', 'move-index');
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.appjs, ['js']);
  gulp.watch(paths.lib, ['move-lib']);
  gulp.watch(paths.img, ['move-img']);
  gulp.watch(paths.templates, ['js']);
  gulp.watch(paths.index, ['move-index']);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www'))

});

gulp.task('js', function() {
  return gulp.src(paths.appjs)
    .pipe(embedTemplates())
    .pipe(concat('component.js'))
    .pipe(gulp.dest('./www/js/'))
});

// Move Lib
gulp.task('move-lib', function(){
  return gulp.src(paths.lib)
  .pipe(gulp.dest('./www/lib/'));
});

// Move Img
gulp.task('move-img', function(){
  return gulp.src(paths.img)
  .pipe(gulp.dest('./www/img/'));
});

// Move index.html
gulp.task('move-index', function(){
  return gulp.src(paths.index)
  .pipe(gulp.dest('.www/'));
});


gulp.task('serve', function () {
  var webserver = require('gulp-webserver');
  gulp.start('default');
  gulp.start('watch');
  gulp.src('.')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      directoryListing: false,
      open: true
    }));
});


// gulp.task('install', ['git-check'], function() {
//   return bower.commands.install()
//     .on('log', function(data) {
//       gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//     });
// });
//
// gulp.task('git-check', function(done) {
//   if (!sh.which('git')) {
//     console.log(
//       '  ' + gutil.colors.red('Git is not installed.'),
//       '\n  Git, the version control system, is required to download Ionic.',
//       '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//       '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//     );
//     process.exit(1);
//   }
//   done();
// });
