var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
// var bowerFiles = require('main-bower-files');
// var inject = require('gulp-inject');
// var es = require('event-stream');


var path = {
    HTML: ['client/*.html', 'client/views/**/*.html', 'client/views/*.html'],
    JS: ['client/*.js', 'client/js/**/*.js', 'client/js/*.js'],
    CSS: ['src/css/*.css'],
    VENDOR: ['bower_components/angular/angular.js', 'bower_components/angular-animate/angular-aria.js', ],
    DIST: ['./dist']
};


gulp.task('watch', function() {
    // set livereload task in watch task, not directly
    gulp.watch(path.JS, ['livereload']);
});

gulp.task('livereload', function() {
    gulp.src('./client')
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'client',
        port: 4000,
        livereload: true
    });
});

gulp.task('default', ['connect', 'watch']);