import fileInclude from "gulp-file-include"; // для сборки отдельных кусков страницы в одну
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // преобразование j.peg/.jpg в .webp формат
import versionNumber from "gulp-version-number"; // стили, изображения - none-cache

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          /**
           * Global version value
           * default: %MDS%
           */
          value: "%DT%",
          /**
           * MODE: APPEND
           * Can coexist and replace, after execution to replace
           */
          append: {
            /**
             * Parameter
             */
            key: "_v",

            /**
             * Whether to overwrite the existing parameters
             * default: 0 (don't overwrite)
             * If the parameter already exists, as a "custom", covering not executed.
             * If you need to cover, please set to 1
             */
            cover: 0,

            /**
             * Appended to the position (specify type)
             * {String|Array|Object}
             * If you set to 'all', will apply to all type, rules will use the global setting.
             * If an array or object, will use your custom rules.
             * others will passing.
             *
             * eg:
             *     'js'
             *     ['js']
             *     {type:'js'}
             *     ['css', '%DATE%']
             */
            to: [
              /**
               * {String} Specify type, the value is the global value
               */
              "css",
              "js",
              /**
               * {Array}
               * Specify type, keyword and cover rules will use the global
               * setting, If you need more details, please use the object
               * configure.
               *
               * argument 0 necessary, otherwise passing.
               * argument 1 optional, the value will use the global value
               */
              ["image", "%TS%"],
            ],
          },

          /**
           * Output to config file
           */
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
