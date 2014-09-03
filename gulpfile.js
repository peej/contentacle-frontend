var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    amdOptimize = require("amd-optimize"),
    template = require('gulp-template-compile'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del');

var IS_DEV = gutil.env.dev;

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
        style: IS_DEV ? 'expanded' : 'compact'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('scripts', function() {
    if (IS_DEV) {
        return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/assets')) && 
        gulp.src([
            'node_modules/requirejs/require.js',
            "node_modules/jquery/dist/jquery.js",
            "node_modules/backbone/backbone.js",
            "node_modules/backbone/node_modules/underscore/underscore.js"
        ])
        .pipe(gulp.dest('dist/assets'));
    } else {
        return gulp.src('src/js/**/*.js')
        .pipe(amdOptimize("app", {
            paths: {
                jquery: "node_modules/jquery/dist/jquery",
                backbone: "node_modules/backbone/backbone",
                underscore: "node_modules/backbone/node_modules/underscore/underscore"
            }
        }))
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets')) && 
        gulp.src('node_modules/requirejs/require.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets'));
    }
});

gulp.task('templates', function() {
    return gulp.src('src/views/**/*.html')
    .pipe(template({
        templateSettings: {
            variable: 'data',
            interpolate: /{{([\s\S]+?)}}/g
        }
    }))
    .pipe(concat('views.js'))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/views/**/*.html', ['templates']);
});

gulp.task('serve', function() {
    connect.server({
        root: 'dist',
        port: 9000,
        fallback: 'dist/index.html'
    });
});

gulp.task('default', ['clean'], function() {
    gulp.start('html', 'styles', 'scripts', 'templates');
});