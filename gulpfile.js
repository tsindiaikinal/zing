import gulp from "gulp";
import { plugins } from "./gulp/config/plagins.js";
import { path } from "./gulp/config/path.js";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { iconsvg } from "./gulp/tasks/iconsvg.js";
import { otfToTtf, ttfToWoff, setFontFace } from "./gulp/tasks/fonts.js";
import { serv } from "./gulp/tasks/server.js";
import { zipper } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.sass, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, images);
}

export { iconsvg };

const fonts = gulp.series(otfToTtf, ttfToWoff, setFontFace);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

export const dev = gulp.series(reset, mainTasks, gulp.parallel(serv, watcher));
export const build = gulp.series(reset, mainTasks);
export const deployZIP = gulp.series(reset, mainTasks, iconsvg, zipper);
export const deployFTP = gulp.series(reset, mainTasks, iconsvg, ftp);