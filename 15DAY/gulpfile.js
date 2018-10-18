const gulp = require('gulp');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('mincss', () => {
  return gulp.src('./css/style.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./css/min'))
  .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('./css/*.css', gulp.parallel('mincss'));
  gulp.watch(['*.html']).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('mincss','watch','browser-sync'));