const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
//compile scss into css
function style() {
  return gulp
    .src("app/src/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/src/css"))
    .pipe(browserSync.stream());
}
//copy bootstrap, jquery, popper.js
function copyjs() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/popper.js/dist/umd/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.js"
    ])
    .pipe(gulp.dest("app/src/js"));
}
//gulp-watch
function watch() {
  browserSync.init({
    server: {
      baseDir: "./app",
      index: "/index.html"
    }
  });
  gulp.watch("app/src/**/*.scss", style);
  gulp.watch("./app/*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.copyjs = copyjs;
