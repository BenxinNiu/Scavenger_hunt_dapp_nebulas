'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var _ = require('lodash');

gulp.task('dependencyInjection', ['compass', 'scripts', 'html'], function() {
  var bower = _.map(bowerFiles(), function(file) {
    var fileName = _.last(file.split('\\'))
    return './dev/scripts/bower/' + fileName
  })
  
  var sources = gulp.src(['./dev/scripts/_app.js','./dev/scripts/*.js', './dev/stylesheets/*.css'], {read: true})
  bower = gulp.src(bower, {read: false})

  gulp.src('./app/app.appcache')
    .pipe(gulp.dest('./dev'));

  return gulp.src('./app/index.html')
    .pipe($.inject(sources, {ignorePath: '/dev/', addRootSlash: false}))
    .pipe($.inject(bower, {ignorePath: '/dev/', name: 'bower', addRootSlash: false}))
    .pipe(gulp.dest('./dev'));
})

gulp.task('compass', function() {
  return gulp.src('./app/styles/*.scss')
    .pipe($.compass({
      sass: 'app/styles',
      css: 'dev/stylesheets'
    }))
    .on('error', function(error) {
      console.log(error)
    })
    .pipe(gulp.dest('./dev'))
    .pipe($.size());
})

gulp.task('scripts', function () {
    return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js'])
        .pipe($.flatten())
        .pipe(gulp.dest('./dev/scripts'))
        .pipe($.size())
});

gulp.task('html', function() {
  gulp.src(['app/**/*.html', 'app/**/*.png', 'app/**/*.pdf', 'app/**/*.jpg', '!app/index.html', '!app/bower_components/**/*.html'])
    .pipe(gulp.dest('dev/'))
})

gulp.task('deployCSS', ['dependencyInjection'], function() {
  gulp.src('./dev/stylesheets/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./dist/stylesheets'))
})

gulp.task('deployJS', ['dependencyInjection'], function() {
  gulp.src('./dev/scripts/*.js')
    .pipe($.concat('app.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'))
})


gulp.task('deploy', ['deployCSS', 'deployJS'])

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 33333 }))
        .use(connect.static('dev'))
        .use(connect.directory('dev'));
    require('http').createServer(app)
        .listen(8080)
        .on('listening', function () {

        });
});

gulp.task('serve', ['connect', 'dependencyInjection'], function () {
    require('opn')('http://localhost:8080');
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();
    // watch for changes
    gulp.watch([
        'dev/index.html',
        'dev/**/*.html',
        'dev/scripts/*.js',
        'dev/stylesheets/*.css'
    ]).on('change', function (file) {
        console.log(file.path + " has changed.")
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['dependencyInjection']);
    gulp.watch('app/**/*.js', ['dependencyInjection']);
    gulp.watch('app/app.js', ['dependencyInjection']);
    gulp.watch('app/index.html', ['html'])
    gulp.watch('app/**/*.html', ['html'])
});
