var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['scripts'], function() {

	gulp.watch('./assets/js/*.js', function() {
		gulp.run('scripts');
	});

});

gulp.task('scripts', function() {
  gulp.src(['./assets/js/gameoflife-core.js','./node_modules/jquery/dist/jquery.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./assets/js/build/'));
});