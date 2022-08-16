import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  return app.gulp
    .src(app.path.src.otf)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(app.gulp.dest(app.path.src.fonts));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(app.path.src.ttf)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fonter({ formats: ["woff"] }))
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(app.path.src.ttf))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
};

export const setFontFace = () => {
  // Записываем подключение шрифтов в файл стилей
  let fontsFile = `${app.path.srcFolder}/sass/_fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверка на наличие файла стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если нет, тогда создаем
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // Запись шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case "thin":
                fontWeight = 100;
                break;
              case "extralight":
                fontWeight = 200;
                break;
              case "light":
                fontWeight = 300;
                break;
              case "medium":
                fontWeight = 500;
                break;
              case "semibold":
                fontWeight = 600;
                break;
              case "bold":
                fontWeight = 700;
                break;
              case "extrabold" || "heavy":
                fontWeight = 800;
                break;
              case "black":
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
                break;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {
                font-family: ${fontName};
                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                font-display: swap;
                font-style: normal;
              }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл  уже существует. Для обновления файла его нужно удалить."
        );
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
