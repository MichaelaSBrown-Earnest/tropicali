var gulp = require('gulp')
var sass = require('gulp-sass') //track sass
var cleanCss = require('gulp-clean-css') //clean up minify sass
var sourcemaps = require("gulp-sourcemaps") //debug to view what line
var imagemin = require("gulp-imagemin") //minify images

var browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');

//this is a one off
    gulp.task("sass", function() {
        return gulp.src("src/css/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCss({
                compatibility: 'ie8'
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream())
    })

//updates dist version of index.html
gulp.task("html", function(){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})



//font task
gulp.task("fonts", function(){
    return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

//img task

gulp.task("images", function(){
    return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})


   //listens out for changes
gulp.task("watch", function (){

    // Static server
        browserSync.init({
            server: {
                baseDir: "dist"
            }
        });
    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
    gulp.watch("src/css/app.scss", gulp.series("sass"))
    gulp.watch("src/fonts/*", gulp.series("fonts")) //if any fomts get added, display automatically
    gulp.watch("src/img/*", gulp.series("images"))
})  


//run default task - on load
gulp.task('default', gulp.series("html","sass", "watch", "fonts", "images"));

    



