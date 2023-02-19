const gulp = require("gulp");
const replace = require("gulp-replace");
const sassInlineSvg = require("gulp-sass-inline-svg");
const svgmin = require("gulp-svgmin");

/* svgs */
gulp.task("sass:svg", function () {
  return gulp
    .src("assets/svgs/*.svg")
    .pipe(svgmin())
    .pipe(
      sassInlineSvg({
        destDir: "assets/styles/@sprites/",
      })
    )
    .pipe(gulp.src("assets/styles/@sprites/" + "_sass-inline-svg.scss"))
    .pipe(replace("call($functionname", "call(get-function($functionname)"))
    .pipe(gulp.dest("assets/styles/@sprites/"));
});

gulp.task("watch", function () {
  gulp.watch("assets/svgs/*.svg", gulp.series("sass:svg"));
});

gulp.task("dev", gulp.series("sass:svg", "watch"), function () {});
