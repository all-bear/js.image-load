const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function() {
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
});
