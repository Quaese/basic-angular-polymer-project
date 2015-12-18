var gulp = require('gulp-help')(require('gulp')),   // https://www.npmjs.com/package/gulp-help
    // gulp = require('gulp'),
    // zip = require('gulp-zip'),
    watch = require('gulp-watch'),                  // https://www.npmjs.com/package/gulp-watch
    rename = require('gulp-rename'),                // https://www.npmjs.com/package/gulp-rename
    less = require('gulp-less'),                    // https://www.npmjs.com/package/gulp-less
    minifyCss = require('gulp-minify-css'),         // https://github.com/murphydanger/gulp-minify-css
    sourcemaps = require('gulp-sourcemaps'),        // https://www.npmjs.com/package/gulp-sourcemaps
    uglify = require('gulp-uglify'),                // https://www.npmjs.com/package/gulp-uglify
    path = require('path'),
    fs = require('fs'),
    gutil = require('gulp-util');


// LESS-Task (https://www.npmjs.com/package/gulp-less)
gulp.task('compress-less', 'Compiliert LESS zu CSS und minifiziert CSS-Files', function() {
    return gulp.src('./app/css/**/*.less')
        // erstelle CSS aus LESS und speicher *.css Datei
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/css/'))
        // Minifiziere CSS-Datei und speicher diese mit min-Suffix
        // .pipe(sourcemaps.init())
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        // .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        // .pipe(gulp.dest('./dist/css/'));
        .pipe(gulp.dest('./app/css/'));
});


// LESS-Task (https://www.npmjs.com/package/gulp-less)
gulp.task('less', 'Compiliert LESS zu CSS', function() {
    return gulp.src('./app/css/**/*.less')
        // erstelle CSS aus LESS und speicher *.css Datei
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/css/'));
});


// Minfizier-Task für CSS-Files (https://github.com/murphydanger/gulp-minify-css)
gulp.task('minify-css','Minifiziert CSS-Files',  function () {
    // return gulp.src('./app/css/**/*.css')
    return gulp.src(['./app/css/**/*.css', '!./app/css/**/*.min.css'])
        .pipe(minifyCss({
            // keepBreaks: true,
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/css/'));
});


// Minfizier- und Sourcemaps-Task für CSS-Files (https://github.com/murphydanger/gulp-minify-css)
gulp.task('minify-sourcemaps-css', 'Minifiziert CSS-Files und inkludiert die zugehoerigen Sourcemaps', function () {
    // return gulp.src('./app/css/**/*.css')
    return gulp.src(['./app/css/**/*.css', '!./app/css/**/*.min.css'])
        .pipe(sourcemaps.init())
        .pipe(minifyCss({
            // keepBreaks: true,
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/css/'));
});


// Minifiziert-Task für JS-Files
gulp.task('compress-js', 'Minifiziert JS-Files', function() {
    // return gulp.src('./app/js/**/*.js')
    return gulp.src(['./app/js/**/*.js', '!./app/js/**/*.min.js'])
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/js/'));
});


// Minifizier- und Sourcemap-Task für JS-Files
gulp.task('compress-sourcemaps-js', 'Minifiziert JS-Files und inkludiert die zugehoerigen Sourcemaps', function() {
    // return gulp.src('./app/js/**/*.js')
    return gulp.src(['./app/js/**/*.js', '!./app/js/**/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/js/'));
});


// Watch-Task für LESS/CSS-Files
gulp.task('watch-less', 'Watch-Task für LESS/CSS-Files', function (cb) {
    // watch LESS/CSS-Minifizier-Task
    var watcher = gulp.watch('./app/css/**/*.less', ['compress-less'])
        actionEvents = ['unlink', 'change', 'add'];

    actionEvents.forEach(function (value, index) {
        watcher.on(value, function(event) {
            var file = event.path.replace(__dirname + path.sep, '');

            console.log('\n----------------------------------------\n');
            gutil.log('Execute ', gutil.colors.yellow('(watch-less)'));
            // gutil.log('File  \'', gutil.colors.cyan(file), '\' was \'', gutil.colors.cyan(event.type), '\', running tasks...');
            gutil.log('File \'' + gutil.colors.cyan(file) + '\' was \'' + gutil.colors.cyan(event.type) + '\', running tasks...');
        });
    });
});


// Watch-Task für JS-Files
gulp.task('watch-js', 'Watch-Task für JS-Files', function (cb) {
    // watch JS-Minifizier-Task
    var watcher = gulp.watch(['./app/js/**/*.js', '!./app/js/**/*.min.js'], ['compress-js'])
        actionEvents = ['unlink', 'change', 'add'];

    actionEvents.forEach(function (value, index) {
        watcher.on(value, function(event) {
            var file = event.path.replace(__dirname + path.sep, '');

            console.log('\n----------------------------------------\n');
            // gutil.log(gutil.colors.bgYellow.black('(watch-js)'));
            gutil.log('Execute', gutil.colors.green('(watch-js)'));
            // gutil.log('File ', gutil.colors.cyan(file), ' was ', gutil.colors.cyan(event.type), ', running tasks...');
            gutil.log('File \'' + gutil.colors.cyan(file) + '\' was \'' + gutil.colors.cyan(event.type) + '\', running tasks...');
        });
    });
});


// Build-Task
gulp.task('build', 'Minifiziert alle erforderlichen Dateien', function () {
    // Build CSS-Files
    console.log('\n----------------------------------------\n');
    gutil.log('Build minified ' + gutil.colors.yellow('CSS') + ' files');
    gulp.start('compress-less');

    console.log('\n----------------------------------------\n');
    // Build JS-Files
    gutil.log('Build minified ' + gutil.colors.green('JS-Files') + ' files');
    gulp.start('compress-js');
});


// Spezial-Tasks
gulp.task('minify', ['less', 'minify-css']);
gulp.task('minify-sourcemaps', ['compress-less', 'minify-sourcemaps-css']);
gulp.task('uglify-sourcemaps', ['compress-sourcemaps-js']);

// Default-Task
gulp.task('default', ['build', 'watch-less', 'watch-js']);



// =====================================================

// var compress = function (themeName) {
//     gutil.log('Compressing ' + themeName);

//     gulp.src(themeName + '/' + themeName + '/**')
//         .pipe(zip(themeName + '.theme'))
//         .pipe(gulp.dest(themeName + '/'));
// };

// gulp.task('build', function (cb) {
//     var themes = fs.readdirSync(__dirname).filter(function (file) {
//         if (file[0] === '.') {
//             return false;
//         }

//         return fs.statSync(path.join(__dirname, file)).isDirectory();
//     });

//     themes.forEach(compress);
//     cb();
// });

// gulp.task('watch', function () {
//     var actionEvents = ['unlink', 'change', 'add'];

//     return gulp.src(['*/**/*.*', '!node_modules/**'])
//         .pipe(watch(['*/**/*.*', '!node_modules/**'], function (file) {
//             var themeName;

//             if (file.path.indexOf('.theme') > -1) {
//                 return;
//             }

//             if (actionEvents.indexOf(file.event) === -1) {
//                 return;
//             }

//             themeName = file.path.replace(__dirname + path.sep, '').split(path.sep)[0];

//             compress(themeName);
//         }));
// });
