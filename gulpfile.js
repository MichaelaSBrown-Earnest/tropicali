var gulp = require('gulp')

//css
var cleanCss = require('gulp-clean-css') //clean up minify sass
var postcss = require("gulp-postcss")
var sourcemaps = require("gulp-sourcemaps") //debug to view what line


var imagemin = require("gulp-imagemin") //minify images

var browserSync = require('browser-sync').create() //browser refresh

var ghpages = require("gh-pages") //publish/deploy to github pages

var concat = require("gulp-concat") //concat multiple Ccs files into app.css


//this is a one off
    gulp.task("css", function() {
        return gulp.src([
            "src/css/reset.css",
            "src/css/typography.css",
            "src/css/app.css"
        ])
        .pipe(sourcemaps.init())
        .pipe(
            postcss([
                require("autoprefixer"),
                require("postcss-preset-env")({
                    stage:1,
                    browsers: ["IE 11", "last 2 versions"]
                })
            ])
        )
        .pipe(concat("app.css"))
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
    gulp.watch("src/css/*", gulp.series("css"))
    gulp.watch("src/fonts/*", gulp.series("fonts")) //if any fomts get added, display automatically
    gulp.watch("src/img/*", gulp.series("images"))
})  

//not in defualy task as it may break the page as you don't want it to go directly to site 
//incase it breaks
gulp.task("deploy", function(){
    ghpages.publish("dist")
})


function build() {
    return gulp.series(
        clean
    )();
}


//run default task - on load
gulp.task('default', gulp.series("html","css", "watch", "fonts", "images"));

    



