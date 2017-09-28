var gulp = require("gulp");
var sass = require("gulp-sass");
var less = require("gulp-less");
var concat = require("gulp-concat");

gulp.task("sass", function () {

    gulp.src("./sass/**/*.scss")
        .pipe(concat("sass.css"))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./compiled"));

});

gulp.task("less", function () {

    gulp.src("./less/**/*.less")
        .pipe(concat("less.css"))
        .pipe(less())
        .pipe(gulp.dest("./compiled"));

});

gulp.task("css", function () {

    gulp.src("./css/**/*.css")
        .pipe(concat("css.css"))
        .pipe(gulp.dest("./compiled"))

});

gulp.task("build", ["css", "less", "sass"]);
