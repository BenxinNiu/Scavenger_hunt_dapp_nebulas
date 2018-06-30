'use strict';

const gulp = require('gulp');
const inject= require('gulp-inject');
const _= require('lodash');
const spawn = require('child_process').spawn;
var node;
gulp.task('dependencyInjection', ['lib', 'app','style','asset'], function() {

    const sources = gulp.src(['dev/lib/angular.js', 'dev/lib/*.js','dev/lib/*.css', 'dev/app/app.js','dev/app/*.js','dev/app/**/*.js','dev/style/*.css'], {read: true});

    gulp.src('server.js').pipe(gulp.dest('./dev'));

    return gulp.src('src/index.html')
        .pipe(inject(sources, {ignorePath: '/dev/', addRootSlash: false}))
        .pipe(gulp.dest('dev'));
});


gulp.task('app',  ()=>{
    return gulp.src(['src/app/**'])
        .pipe(gulp.dest('./dev/app'))
});

gulp.task('style', ()=>{
    return gulp.src(['src/style/**/*.css'])
        .pipe(gulp.dest('./dev/style'))
});

gulp.task('asset', ()=>{
    return gulp.src(['src/asset/**'])
        .pipe(gulp.dest('./dev/asset'))
});

gulp.task('lib', ()=>{
const lib_src = gulp.src([
                          'node_modules/angular/angular.js',
                         // 'node_modules/bootstrap/dist/js/bootstrap.js',
                          'node_modules/bootstrap/dist/css/bootstrap.min.css',
                          'node_modules/font-awesome/css/font-awesome.css',
                          'node_modules/jquery/dist/jquery.js',
                            'node_modules/angular-ui-router/release/angular-ui-router.js'
                          ],{read: true});
return lib_src.pipe(gulp.dest('./dev/lib'));
});

gulp.task('serve',['dependencyInjection'], ()=> {
    if (node) node.kill();
    node = spawn('node', ['dev/server.js'], {stdio: 'inherit'})
    node.on('close', (code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
    gulp.watch('src/**', ['dependencyInjection'], ()=> {
        console.log('server refreshed');
        gulp.run('server');
    });
});
