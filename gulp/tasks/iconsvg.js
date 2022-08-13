import svgSprite from "gulp-svg-sprite";

export const iconsvg = () => {
  return app.gulp
    .src(app.path.src.iconsvg, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ICON SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            // Создается страница со списком иконок
            example: true
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.img));
};
