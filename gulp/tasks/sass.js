import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.sass, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SASS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(app.plugins.if(app.isBuild,groupCssMediaQueries()))
    .pipe(app.plugins.if(app.isBuild,
      webpcss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    ))
    .pipe(app.plugins.if(app.isBuild,
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true,
      }))) // Раскомментировать если нужен не сжатый дубль CSS
    .pipe(app.plugins.if(app.isBuild,app.gulp.dest(app.path.build.css)))
    .pipe(app.plugins.if(app.isBuild,cleancss()))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
